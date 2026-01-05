import { useCallback, useState } from "react";

type StateType<T> = {
    data: T | null;
    isLoading: boolean;
    error: string | null;
};

type UseHttpOptionsType = {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: unknown;
    headers?: HeadersInit;
};

const useHttp = <T = unknown,>() => {
    const [httpState, setHttpState] = useState<StateType<T>>({
        data: null,
        isLoading: false,
        error: null
    });

    const sendReq = useCallback(
        async (url: string, options?: UseHttpOptionsType) => {
            setHttpState((preState) => {
                return { ...preState, isLoading: true, error: null };
            });
            try {
                const reqObj: RequestInit = {
                    method: options?.method || "GET",
                    headers: {
                        "Content-Type": "application/json",
                        ...options?.headers
                    },
                    body: options?.body
                        ? JSON.stringify(options.body)
                        : undefined
                };

                const res = await fetch(url, reqObj);

                const data: T = await res.json();
                if (!res.ok) {
                    throw new Error(data.message);
                }
                setHttpState((preState) => {
                    return { ...preState, isLoading: false, data: data };
                });
                return data;
            } catch (err) {
                setHttpState((preState) => {
                    return {
                        ...preState,
                        isLoading: false,
                        error: (err as Error).message || "Something Went Wrong"
                    };
                });
                console.log("Something went wrong", err);
                throw err;
            }
        },
        []
    );

    return {
        httpState,
        sendReq
    };
};

export default useHttp;
