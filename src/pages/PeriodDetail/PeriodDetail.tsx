import React from "react";
import AdminContainer from "../../components/AdminContainer/AdminContainer";
import { IonContent } from "@ionic/react";
import { useSelector } from "react-redux";
import MealDetailTable from "../../components/TableRowExpandCollapse/MealDetailTable";

const PeriodDetail: React.FC = () => {
  const periodDetail = useSelector((state: any) => state.periodDetail);

  return (
    <IonContent>
      <AdminContainer>
        <h4 className="font-bold my-2">Period Detail</h4>
        <p className="text-center bg-[#62b4ff] text-white px-3 py-2 mt-4">
          Expected and Actual Meal Count and Sales
        </p>
        <div className="overflow-x-auto">
          <MealDetailTable data={periodDetail} />
        </div>
      </AdminContainer>
    </IonContent>
  );
};

export default PeriodDetail;
