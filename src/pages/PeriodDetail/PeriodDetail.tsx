import React from "react";
import AdminContainer from "../../components/AdminContainer/AdminContainer";
import { IonContent, IonButton, IonIcon } from "@ionic/react";
import { useSelector } from "react-redux";
import MealDetailTable from "../../components/TableRowExpandCollapse/MealDetailTable";
import * as XLSX from "xlsx";
import { downloadOutline } from "ionicons/icons";

const PeriodDetail: React.FC = () => {
  const periodDetail = useSelector((state: any) => state.periodDetail);
  console.log(periodDetail);

  // const handleDownload = () => {
  //   const ws = XLSX.utils.table_to_sheet(document.querySelector("table"));
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  //   XLSX.writeFile(wb, "meal_detail_table.xlsx");
  // };
  const handleDownload = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(document.querySelector(".table-v2"));
    XLSX.utils.book_append_sheet(wb, ws, "MealDetailTable");
    XLSX.writeFile(wb, "MealDetailTable.xlsx");
  };

  return (
    <IonContent>
      <AdminContainer>
        <h4 className="font-bold my-2">Period Detail</h4>
        <IonButton className="mt-4" color="secondary" onClick={handleDownload}>
          <IonIcon slot="start" icon={downloadOutline}></IonIcon>
          Download Excel
        </IonButton>

        <p className="text-center bg-[#62b4ff] text-white px-3 py-2 mt-2">
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
