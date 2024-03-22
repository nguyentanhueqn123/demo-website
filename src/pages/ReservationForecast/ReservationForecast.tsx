import React from "react";
import Header from "../../components/Header/Header";
import AdminContainer from "../../components/AdminContainer/AdminContainer";

const ReservationForecast: React.FC = () => {
  return (
    <AdminContainer>
      <div className="">
        <h1 className="flex justify-center items-center mt-40">
          Reservation Forecast
        </h1>
      </div>
    </AdminContainer>
  );
};

export default ReservationForecast;
