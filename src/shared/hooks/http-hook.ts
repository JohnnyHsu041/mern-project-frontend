import { useCallback, useState, useRef, useEffect } from "react";

type sendReqFunc = (
    url: string,
    method?: string,
    body?: BodyInit | null,
    headers?: { [props: string]: string } | {}
) => any;

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const activeHttpReqs = useRef<AbortController[]>([]);

    const sendRequest: sendReqFunc = useCallback(
        async (url, method = "GET", body = null, headers = {}) => {
            setIsLoading(true);

            const httpAbortCtrl = new AbortController();
            activeHttpReqs.current.push(httpAbortCtrl);

            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                    signal: httpAbortCtrl.signal,
                });
                const responseData = await response.json();

                activeHttpReqs.current = activeHttpReqs.current.filter(
                    (reqCtrl) => reqCtrl !== httpAbortCtrl
                );

                if (!response.ok) throw new Error(responseData.message);

                setIsLoading(false);

                return responseData;
            } catch (err: any) {
                setIsLoading(false);
                setError(err.message);
                throw err;
            }
        },
        []
    );

    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            activeHttpReqs.current.forEach((abortCtrl) => {
                abortCtrl.abort();
            });
        };
    }, []);

    return { isLoading, error, sendRequest, clearError };
};
