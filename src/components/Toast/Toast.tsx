import React from "react";
import { useIonToast } from "@ionic/react";
import "./Toast.css";

const useToast = () => {
  const [presentToast, dismissToast] = useIonToast();

  const showToast = (content: string, color: string, position: any) => {
    presentToast({
      message: content,
      duration: 1500,
      color: color,
      position: position,
      buttons: [
        {
          text: "X",
          role: "cancel",
          handler: dismissToast,
        },
      ],
    });
  };

  return showToast;
};

export default useToast;
