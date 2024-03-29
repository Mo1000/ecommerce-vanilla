import ky, {Options} from 'ky';
import {transformeResponseApi} from '@/utils/transformeResponseApi';
import {FormattedResponse} from "@/models/api-response.model.ts";
import {ResponseErrorAPi} from "@/models/handleErrorApi/error-api.model.ts";


const API_BASE_URL = import.meta.env.VITE_PUBLIC_API_BASE_URL;

/* eslint-disable  @typescript-eslint/no-explicit-any */
function getCustomFetch() {
    return ky.extend({
        prefixUrl: API_BASE_URL,
        timeout: 60000,
        // hooks: {
        //     beforeRequest: [
        //         (request) => {
        //             const token = getCookieValue(USER_JWT_TOKEN_COOKIE_NAME || 'token');
        //             if (token) request.headers.set('Authorization', `Bearer ${token}`);
        //         },
        //     ],
        // },
    });
}

const kyInstanceClient = getCustomFetch();

export async function get<T>(
    path: string,
    config?: Options,
): Promise<FormattedResponse<T>> {
    try {
        const res: T = await kyInstanceClient
            .get(path, config)
            .json();
        return transformeResponseApi<T>(true, res);
    } catch (error: any) {
        if (error?.name === 'HTTPError') {
            throw transformeResponseApi<ResponseErrorAPi>(
                false,
                await error.response.json(),
                error.name,
            );
        }
        throw transformeResponseApi<any>(false, error);
    }
}

export async function remove<T>(
    path: string,
    body?: any,
    config?: Options,
): Promise<FormattedResponse<T>> {
    try {
        const res:T = await kyInstanceClient
            .delete(path, {
                json: body,
                ...config,
            })
            .json();
        return transformeResponseApi<T>(true, res);
    } catch (error: any) {
        if (error?.name === 'HTTPError') {
            throw transformeResponseApi<ResponseErrorAPi>(
                false,
                await error.response.json(),
                error.name,
            );
        }
        throw transformeResponseApi<any>(false, error);
    }
}

export async function patch<T>(
    path: string,
    body: any,
    config?: Options,
): Promise<FormattedResponse<T>> {
    try {
        const res: T = await kyInstanceClient
            .patch(path, {
                json: body,
                ...config,
            })
            .json();
        return transformeResponseApi<T>(true, res);
    } catch (error: any) {
        if (error?.name === 'HTTPError') {
            throw transformeResponseApi<ResponseErrorAPi>(
                false,
                await error.response.json(),
                error.name,
            );
        }
        throw transformeResponseApi<any>(false, error);
    }
}

export async function post<T>(
    path: string,
    body: any,
    config?: Options,
): Promise<FormattedResponse<T>> {
    try {
        const res: T = await kyInstanceClient
            .post(path, {
                json: body,
                ...config,
            })
            .json();
        return transformeResponseApi<T>(true, res);
    } catch (error: any) {
        if (error?.name === 'HTTPError') {
            throw transformeResponseApi<ResponseErrorAPi>(
                false,
                await error.response.json(),
                error.name,
            );
        }
        throw transformeResponseApi<any>(false, error);
    }
}
