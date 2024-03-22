import React from "react";
import Header from "../components/Header/Header";
import AdminContainer from "../components/AdminContainer/AdminContainer";
import { hotelData } from "../data/hotelData";
import { dashboardSampleV0_4MealDetailData } from "../data/sampledata_meal_detail";

const Dashboard: React.FC = () => {
  // console.table(hotelData);
  // console.log(dashboardSampleV0_4MealDetailData);

  return (
    <AdminContainer>
      <div>
        <h1 className="flex justify-center items-center mt-40">Dashboard</h1>
      </div>
    </AdminContainer>
  );
};

export default Dashboard;
