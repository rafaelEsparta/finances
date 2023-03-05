import { api } from "./api";
import { AxiosResponse } from "axios";

export const FinancialApi = () => {
  const getPlan = (): Promise<AxiosResponse<any>> => {
    return api.get<any>(`/financeiro`);
  };

  const notify = (): Promise<AxiosResponse<any>> => {
    return api.get<any>(`/notify`);
  };

  return {
    getPlan,
    notify,
  };
};

export default FinancialApi();
