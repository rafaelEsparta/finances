import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const createApiInstance = (): AxiosInstance => {
  const config: AxiosRequestConfig = {
    baseURL:
      "https://api.sheety.co/ce8401155b0eb37d32b49a4d0044ee0b/planilhaSemTítulo/",
    timeout: 60 * 1000,
  };
  const instance = axios.create(config);

  // instance.interceptors.request.use(async (configInstance) => {
  //   const token = AuthUtils.getToken(
  //     IdentificationKeyLocalStorage.CORE_RESPONSE
  //   );
  //   if (token != null) {
  //     configInstance.headers!.Authorization = `Bearer ${token}`;
  //   }
  //   return configInstance;
  // });

  return instance;
};

export const api = createApiInstance();

export default api;
