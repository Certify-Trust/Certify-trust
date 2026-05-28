import { toast } from "sonner";
import { AxiosError } from "axios";

type ApiError = {
  message: string;
};

export function handleApiError(error: unknown) {
  const axiosError = error as AxiosError<ApiError>;

  const message =
    axiosError?.response?.data?.message ||
    (error as Error)?.message ||
    "Something went wrong";

  toast.error(message);
}
