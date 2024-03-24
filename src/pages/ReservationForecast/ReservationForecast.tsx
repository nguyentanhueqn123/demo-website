import React, { useState, useEffect } from "react";
import AdminContainer from "../../components/AdminContainer/AdminContainer";
import { IonContent, IonCheckbox } from "@ionic/react";
import { useSelector } from "react-redux";
import LineChart from "../../components/Chart/LineChart";
import { useDebounce } from "use-debounce";
import { useHistory, useLocation } from "react-router-dom";

const ReservationForecast: React.FC = () => {
  const reservationForecast = useSelector(
    (state: any) => state.reservationForecast
  );
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
  const [defaultForecastData, setDefaultForecastData] = useState<any[]>([]);
  const [debouncedSelectedPeriods] = useDebounce(selectedPeriods, 500);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const typeParam = searchParams.getAll("type");
    if (typeParam.length) {
      setSelectedPeriods(typeParam);
    }
  }, [location.search]);

  useEffect(() => {
    // Update URL with selectedPeriods
    const queryParams = new URLSearchParams();
    debouncedSelectedPeriods.forEach((period) =>
      queryParams.append("type", period)
    );
    history.replace({ search: queryParams.toString() });
  }, [debouncedSelectedPeriods]);

  useEffect(() => {
    // Lưu trữ dữ liệu mặc định trước khi filter
    setDefaultForecastData(reservationForecast);
  }, [reservationForecast]);

  function filterDataByPeriod(data: any, period: string) {
    const now = new Date();
    let filteredData = [];

    switch (period) {
      case "this month":
        filteredData = data.filter((item: any) => {
          const itemDate = new Date(item.Date);
          return (
            itemDate.getMonth() === now.getMonth() &&
            itemDate.getFullYear() === now.getFullYear()
          );
        });
        break;
      case "3 months":
        filteredData = data.filter((item: any) => {
          const itemDate = new Date(item.Date);
          const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 2));
          return itemDate >= threeMonthsAgo && itemDate <= new Date();
        });
        break;
      case "6 months":
        filteredData = data.filter((item: any) => {
          const itemDate = new Date(item.Date);
          const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 5));
          return itemDate >= sixMonthsAgo && itemDate <= new Date();
        });
        break;
      default:
        filteredData = data;
    }

    return filteredData;
  }

  // const handleChangeCheckbox = (period: string, checked: boolean) => {
  //   let updatedSelectedPeriods: string[] = [];
  //   if (checked) {
  //     updatedSelectedPeriods = [...selectedPeriods, period];
  //   } else {
  //     updatedSelectedPeriods = selectedPeriods.filter(
  //       (selectedPeriod) => selectedPeriod !== period
  //     );
  //   }
  //   setSelectedPeriods(updatedSelectedPeriods);
  // };

  const handleChangeCheckbox = (period: string, checked: boolean) => {
    let updatedSelectedPeriods: string[] = [];
    if (checked) {
      updatedSelectedPeriods = [period]; // Chỉ lưu period mới được chọn
    }
    setSelectedPeriods(updatedSelectedPeriods);
  };

  return (
    <IonContent>
      <AdminContainer>
        <h4 className="font-bold my-2">Reservation Forecast</h4>
        <div>
          <IonCheckbox
            checked={selectedPeriods.includes("this month")}
            onIonChange={(e) =>
              handleChangeCheckbox("this month", e.detail.checked)
            }
          />
          <label>This Month</label>
        </div>
        <div>
          <IonCheckbox
            checked={selectedPeriods.includes("3 months")}
            onIonChange={(e) =>
              handleChangeCheckbox("3 months", e.detail.checked)
            }
          />
          <label>3 Months</label>
        </div>
        <div>
          <IonCheckbox
            checked={selectedPeriods.includes("6 months")}
            onIonChange={(e) =>
              handleChangeCheckbox("6 months", e.detail.checked)
            }
          />
          <label>6 Months</label>
        </div>
        <LineChart
          data={
            selectedPeriods.length > 0
              ? debouncedSelectedPeriods.flatMap((period) =>
                  filterDataByPeriod(defaultForecastData, period)
                )
              : defaultForecastData
          }
        />
      </AdminContainer>
    </IonContent>
  );
};

export default ReservationForecast;
