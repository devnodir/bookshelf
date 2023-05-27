import { useMutation, UseMutationOptions } from "react-query";
import { AxiosResponse } from "axios";
import api, { abortController } from "@/utils/api";

const useApiMutationID = <Variables = any, Response = any, Error = any>(
    type: "patch" | "delete" | "get",
    url = "",
    options: UseMutationOptions<AxiosResponse<Response>, Error, Variables> = {},
    params: object = {}
) => {
    const mutation = useMutation<AxiosResponse<Response>, Error, Variables>(
        async ({ id, data }: any) =>
            await api[type](`${url}/${id}`, data, {
                signal: abortController.signal,
                params,
            }),
        {
            ...options,
        }
    );
    return { ...mutation };
};

export default useApiMutationID;
