import {FormattedResponse} from "@/models/api-response.model.ts";
import {post} from "@/helpers/ky.helper.ts";
import {UserModel} from "@/models/user.model.ts";
import {setCookieValue} from "@/utils/storage/manageCookies.ts";
import {USER_COLOR_COOKIE_NAME, USER_JWT_TOKEN_COOKIE_NAME} from "@/constants";
import {randomColor} from "@/utils/randomColor.ts";

interface DataModel {
    token:string;
    user:UserModel;
}
export abstract class AuthService {
    private static basePath: string = 'auth';

    static async register(
        user: Partial<UserModel>,
    ): Promise<FormattedResponse<DataModel>> {
        const data= await post<DataModel>(`${this.basePath}/register`, user);
        setCookieValue(USER_JWT_TOKEN_COOKIE_NAME,data.data.token)
        setCookieValue(USER_COLOR_COOKIE_NAME, randomColor());
        return data;
    }

    static async login(
        user: Partial<UserModel>,
    ): Promise<FormattedResponse<DataModel>> {
        const data= await post<DataModel>(`${this.basePath}/login`, user);
        setCookieValue(USER_JWT_TOKEN_COOKIE_NAME,data.data.token)
        setCookieValue(USER_COLOR_COOKIE_NAME, randomColor());
        return data;
    }




}
