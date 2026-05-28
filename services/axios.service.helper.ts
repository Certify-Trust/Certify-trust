import axios, { AxiosRequestConfig, Method } from "axios";

type Payload<T = unknown> = {
  url: string;
  method: Method;
  data?: T;
  signal?: AbortSignal;
  params?: Record<string, unknown>;
  headers?: AxiosRequestConfig["headers"];
};

const axiosService = async <TResponse = unknown, TData = unknown>({
  url,
  method,
  data,
  signal,
  params,
  headers,
}: Payload<TData>): Promise<TResponse> => {
  const authToken =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const response = await axios<TResponse>({
    method,
    url,
    params,
    signal,
    data,
    headers: headers ?? {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      ...(authToken && {
        Authorization: `Bearer ${authToken}`,
      }),
    },
  });

  return response.data;
};

export default axiosService;
