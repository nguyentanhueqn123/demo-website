import React, { useEffect, useState } from "react";
import "./Login.css";
import { IonButton, IonContent, IonInput, IonLabel } from "@ionic/react";
import { useHistory } from "react-router-dom";
import Toast from "../../components/Toast/Toast";
import { loginApi } from "../../server/UserApi";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setPassword, setToken } from "../../stores/loginSlice";

const Login: React.FC = () => {
  const history = useHistory();
  const showToast = Toast();
  const dispatch = useDispatch();

  const { email, password } = useSelector((state: any) => state.login);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      // history.push("/dashboard");
      history.push("/actual-data");
    }
  }, []);

  const handleLogin = async () => {
    if (!email) {
      showToast("Email cannot be blank", "danger", "top");
      return;
    }
    if (!password) {
      showToast("Password cannot be blank", "danger", "top");
      return;
    }
    let res = await loginApi(email, password);
    if (res && res.data?.token) {
      localStorage.setItem("token", res.data?.token);
      dispatch(setToken(res.data?.token));
      showToast("Login successfully", "success", "top");
      history.push("/actual-data");
    } else {
      if (res && res.status === 401) {
        console.log("error user: ", res.data.error);
        showToast("Wrong email or password", "danger", "top");
      }
    }

    console.log("check login: ", res);
  };

  return (
    <IonContent>
      <section className="bg-[url('/public/images/bg-main.png')] bg-cover bg-no-repeat h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
            <img
              className="w-10 h-10 mr-2"
              src="https://infotelvn.com/thumbs_size/banner/2015_12/logo_header_png/165x98_fw_logo_header.png"
              alt="logo"
            />
            Dashboard for Hotel Administration
          </div>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <IonLabel className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Login eve.holt@reqres.in
              </IonLabel>
              <div className="space-y-4 md:space-y-6">
                <IonInput
                  autoFocus
                  label="Email"
                  labelPlacement="floating"
                  fill="outline"
                  type="email"
                  placeholder="Enter your email"
                  onIonChange={(e: any) => {
                    dispatch(setEmail(e.target.value));
                    // console.log(e.target.value);
                  }}
                ></IonInput>
                <IonInput
                  label="Password"
                  labelPlacement="floating"
                  fill="outline"
                  type="password"
                  placeholder="Enter your password"
                  onIonChange={(e: any) => {
                    dispatch(setPassword(e.target.value));
                    // console.log(e.target.value);
                  }}
                ></IonInput>
                <div className="flex items-center justify-end">
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                <IonButton
                  size="large"
                  color="primary"
                  expand="block"
                  className="text-black hover:opacity-90 font-medium text-sm text-center"
                  onClick={() => handleLogin()}
                >
                  Login
                </IonButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </IonContent>
  );
};

export default Login;
