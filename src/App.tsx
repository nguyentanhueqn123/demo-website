import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./theme/variables.css";

import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard";
import ActualData from "./pages/ActualData/ActualData";
import ReservationForecast from "./pages/ReservationForecast/ReservationForecast";
import PeriodDetail from "./pages/PeriodDetail/PeriodDetail";
import Account from "./pages/Account/Account";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login" component={Login} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route
          // path="/dashboard"
          render={() => {
            return localStorage.getItem("token") ? (
              <>
                <Header />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/actual-data" component={ActualData} />
                <Route
                  exact
                  path="/reservation-forecast"
                  component={ReservationForecast}
                />
                <Route exact path="/period-detail" component={PeriodDetail} />

                <Route exact path="/account" component={Account} />
              </>
            ) : (
              <Redirect to="/login" />
            );
          }}
        ></Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
