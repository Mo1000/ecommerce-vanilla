import {getCookieValue} from "@/utils/storage/manageCookies.ts";
import {USER_JWT_TOKEN_COOKIE_NAME} from "@/constants";

export  function redirectWhenLoggedIn(){
    if(!getCookieValue(USER_JWT_TOKEN_COOKIE_NAME)){
        window.location.replace("/")
    }
}
