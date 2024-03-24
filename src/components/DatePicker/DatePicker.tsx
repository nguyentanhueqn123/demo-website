import {
  IonDatetime,
  IonDatetimeButton,
  IonLabel,
  IonModal,
} from "@ionic/react";
import React, { useState } from "react";
// import "./DatePicker.css";
interface FilterToolbarProp {
  from: Date;
  to: Date;
  onValueChange: (prop: String, oldVal: Date, newValue: Date) => void;
}

interface ReturnValue {
  from: Date;
  to: Date;
}
export const FilterToolbar: React.FC<FilterToolbarProp> = ({
  from,
  to,
  onValueChange,
}) => {
  const [localFrom, setLocalFrom] = useState<Date>(from);
  const [localTo, setLocalTo] = useState<Date>(to);

  const fromHandle = (e: any) => {
    onValueChange("from date: ", localFrom, e.detail.value);
    setLocalFrom(e.detail.value);
    // console.log(">>  Từ ngày: ", e.detail.value);
  };
  const toHandle = (e: any) => {
    onValueChange("to date: ", localTo, e.detail.value);
    setLocalTo(e.detail.value);
    // console.log(">>  Đến ngày: ", e.detail.value);
  };
  return (
    <div className="container-datepicker">
      <IonLabel>Từ Ngày: </IonLabel>
      <div className="container-date">
        <IonDatetimeButton datetime="datetimeFrom"></IonDatetimeButton>
        <IonModal keepContentsMounted={true}>
          <IonDatetime
            id="datetimeFrom"
            locale="vi-VN"
            onIonChange={fromHandle}
          ></IonDatetime>
        </IonModal>
      </div>
      <div style={{ paddingLeft: "2.5rem" }}></div>
      <div className="container-date">
        <IonLabel>Đến Ngày: </IonLabel>
        <IonDatetimeButton datetime="datetimeTo"></IonDatetimeButton>
        <IonModal keepContentsMounted={true}>
          <IonDatetime
            id="datetimeTo"
            locale="vi-VN"
            onIonChange={toHandle}
          ></IonDatetime>
        </IonModal>
      </div>
    </div>
  );
};
