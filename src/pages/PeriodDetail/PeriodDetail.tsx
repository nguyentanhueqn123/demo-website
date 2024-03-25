import React, { useEffect, useState } from "react";
import AdminContainer from "../../components/AdminContainer/AdminContainer";
import {
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonLabel,
} from "@ionic/react";
import { useSelector } from "react-redux";
import MealDetailTable from "../../components/TableRowExpandCollapse/MealDetailTable";
import * as XLSX from "xlsx";
import { downloadOutline, filterOutline } from "ionicons/icons";
import { FilterToolbar } from "../../components/DatePicker/DatePicker";

const PeriodDetail: React.FC = () => {
  const periodDetail = useSelector((state: any) => state.periodDetail);

  const [localFrom, setLocalFrom] = useState<Date>(new Date());
  const [localTo, setLocalTo] = useState<Date>(new Date());
  const [filteredPeriodDetail, setFilteredPeriodDetail] = useState<any[]>([]);
  const [originalPeriodDetail, setOriginalPeriodDetail] = useState<any[]>([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  useEffect(() => {
    setOriginalPeriodDetail(periodDetail);
    const filteredPeriodDetail = periodDetail.filter(
      (periodDetail: any) =>
        periodDetail.report_date >= localFrom &&
        periodDetail.report_date <= localTo
    );
    setFilteredPeriodDetail(filteredPeriodDetail);
    setIsFilterApplied(false);
  }, [localFrom, localTo, periodDetail]);

  const handleFilter = () => {
    setIsFilterApplied(true);
  };

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
        <IonCard>
          <FilterToolbar
            from={localFrom}
            to={localTo}
            onValueChange={(prop, oldVal, newValue) => {
              if (prop === "from date: ") {
                setLocalFrom(newValue);
              } else if (prop === "to date: ") {
                setLocalTo(newValue);
              }
            }}
          />
          <div className="mx-4 mb-4 flex flex-col md:flex-row">
            <IonButton
              className=""
              color="secondary"
              onClick={handleFilter}
              disabled={isFilterApplied}
            >
              <IonIcon slot="start" icon={filterOutline}></IonIcon>
              Filter
            </IonButton>
            <IonButton
              className="ml-0 mt-2 md:mt-0 md:ml-4"
              color="secondary"
              onClick={handleDownload}
            >
              <IonIcon slot="start" icon={downloadOutline}></IonIcon>
              Download Excel
            </IonButton>
          </div>
        </IonCard>

        <p className="text-center bg-[#62b4ff] text-white px-3 py-2 mt-4">
          Expected and Actual Meal Count and Sales
        </p>

        <div className="overflow-x-auto">
          <MealDetailTable
            data={isFilterApplied ? filteredPeriodDetail : originalPeriodDetail}
          />
        </div>
      </AdminContainer>
    </IonContent>
  );
};

export default PeriodDetail;
