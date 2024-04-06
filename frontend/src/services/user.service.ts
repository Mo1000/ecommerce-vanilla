import {FormattedResponse} from "@/models/api-response.model.ts";
import {get} from "@/helpers/ky.helper.ts";
import {UserModel} from "@/models/user.model.ts";


export abstract class UserService {
    private static basePath: string = 'users';

    static async getUser(): Promise<FormattedResponse<UserModel>> {
        return await get<UserModel>(`${this.basePath}`, );
    }

}
