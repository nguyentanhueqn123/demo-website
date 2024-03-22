import axiosClient from "./axiosClient";

const loginApi = (email: string, password: string) => {
  const url = `/api/login`;
  return axiosClient.post(url, { email, password });
};

export { loginApi };
