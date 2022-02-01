import axios from "axios";
import useAuth from "./context/AuthContext";
import { useMemo } from "react";

const instance = axios.create({
  baseURL: "http://localhost:4000/api/v1/",
  withCredentials: true,
});

const AxiosClient = ({ children }) => {
  const { setUser, verifyMe } = useAuth();

  useMemo(() => {
    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (
          error &&
          error.response &&
          error.response.status === 401 &&
          error.config &&
          error.response.data.error.name === "JsonWebTokenError"
        ) {
          instance
            .get("/auth/refresh")
            .then(async () => {
              const verifiedData = await verifyMe();
              setUser(verifiedData.data.user);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }
        return Promise.reject(error);
      }
    );
  }, [setUser]);
  return children;
};

export default instance;
export { AxiosClient };
