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
        <div className="grid grid-cols-1 md:grid-cols-2 mt-4">
          <div className="px-4 py-3 mb-4 rounded-lg shadow-md bg-[#F2F2F2]">
            <span className="flex text-base font-bold mb-2">Filter</span>
            <div>
              <IonCheckbox
                labelPlacement="end"
                checked={selectedPeriods.includes("this month")}
                onIonChange={(e) =>
                  handleChangeCheckbox("this month", e.detail.checked)
                }
              >
                This Month
              </IonCheckbox>
            </div>
            <div>
              <IonCheckbox
                labelPlacement="end"
                checked={selectedPeriods.includes("3 months")}
                onIonChange={(e) =>
                  handleChangeCheckbox("3 months", e.detail.checked)
                }
              >
                3 Months
              </IonCheckbox>
            </div>
            <div>
              <IonCheckbox
                labelPlacement="end"
                checked={selectedPeriods.includes("6 months")}
                onIonChange={(e) =>
                  handleChangeCheckbox("6 months", e.detail.checked)
                }
              >
                6 Months
              </IonCheckbox>
            </div>
          </div>
        </div>
        <div className="p-4 md:mt-8 my-8 rounded-lg shadow-xs bg-white border shadow-sm ">
          <p className="opacity-80 font-medium text-lg">
            The line chart shows Total Occ. , Arr. Rooms , Dep. Rooms
          </p>
          <div className="overflow-x-auto-custome2">
            <LineChart
              data={
                selectedPeriods.length > 0
                  ? debouncedSelectedPeriods.flatMap((period) =>
                      filterDataByPeriod(defaultForecastData, period)
                    )
                  : defaultForecastData
              }
            />
          </div>
        </div>
      </AdminContainer>
    </IonContent>
  );
};

export default ReservationForecast;
