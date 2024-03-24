import React from "react";
import AdminContainer from "../../components/AdminContainer/AdminContainer";
import { IonContent } from "@ionic/react";
import { useSelector } from "react-redux";
import LineChart from "../../components/Chart/LineChart";

const ReservationForecast: React.FC = () => {
  const reservationForecast = useSelector(
    (state: any) => state.reservationForecast
  );

  // reservationForecast.map((item: any) => {
  //   console.log("id:", item.id);
  //   console.log("Date:", item.Date);
  //   console.log("Total Occ.:", item["Total Occ."]);
  //   console.log("Arr. Rooms:", item["Arr. Rooms"]);
  //   console.log("Dep. Rooms:", item["Dep. Rooms"]);
  //   console.log("--------------------");
  // });
  const data = [
    {
      id: 1,
      Date: "01-Feb-2020",
      "Total Occ.": 166,
      "Arr. Rooms": 109,
      "Dep. Rooms": 66,
    },
    {
      id: 2,
      Date: "02-Feb-2020",
      "Total Occ.": 172,
      "Arr. Rooms": 91,
      "Dep. Rooms": 85,
    },
    {
      Date: "04-Feb-2020",
      "Total Occ.": 1665,
      "Arr. Rooms": 180,
      "Dep. Rooms": 100,
    },
    {
      Date: "12-Feb-2020",
      "Total Occ.": 172,
      "Arr. Rooms": 91,
      "Dep. Rooms": 85,
    },
    // Thêm các dòng dữ liệu khác ở đây
  ];
  return (
    <IonContent>
      <AdminContainer>
        <h4 className="font-bold my-2"> Reservation Forecast</h4>
        <LineChart data={reservationForecast} />
      </AdminContainer>
    </IonContent>
  );
};

export default ReservationForecast;
