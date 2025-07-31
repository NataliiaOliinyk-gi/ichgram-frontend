import { useState, useEffect } from "react";

import type { AxiosError } from "axios";

interface IUseFetchProps<T> {
  request: () => Promise<{ data?: T; error?: unknown }>;
  initialData: T;
}

interface IUseFetchResult<T> {
  data: T;
  loading: boolean;
  error: string | null;
  setData: React.Dispatch<React.SetStateAction<T>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const useFetch = <T>({
  request,
  initialData,
}: IUseFetchProps<T>): IUseFetchResult<T> => {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await request();
      setLoading(false);

      if (error) {
        const message =
          (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message ||
          "Unbekannter Fehler";
        setError(message);

      } else if (data !== undefined) {
        setData(data);
      }
    };

    fetchData();
  }, [request]);

  return {
    data,
    loading,
    error,
    setData,
    setLoading,
    setError,
  };
};

export default useFetch;



        // let message = "Unknown error";
        // if (error instanceof AxiosError) {
        //   message = error.response?.data?.message || error.message;
        // } else if (error instanceof Error) {
        //   message = error.message;
        // }