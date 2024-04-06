import {FormattedResponse} from "@/models/api-response.model.ts";
import {ResponseErrorAPi} from "@/models/handleErrorApi/error-api.model.ts";
import {AuthException} from "@/utils/handleErrorFromApi/exception/auth.exception.ts";
import {notify} from "@/utils/notify.ts";
import {formatTextForSwal, SwalCustom} from "@/utils/swalUtils.ts";
import {NameErrorKy} from "@/enums/handleErrorAPi/error-api.enum.ts";


export const handleLoginError = async (
  res: FormattedResponse<ResponseErrorAPi>,
) => {
  if (res.nameError === NameErrorKy.HTTP_ERROR) {
    if (res.data.error.statusCode === AuthException.invalidCredentials().statusCode) {
      notify("Vos informations d'identification ne sont valides", {
        type: 'error',
      });
    } else if (res.data.error.code === AuthException.emailNotConfirmed().code) {
      await SwalCustom.fire({
        title: formatTextForSwal(
          'Votre adresse email n’a pas été confirmée. Veuillez vérifier votre boîte de réception ou vos spams pour le lien de confirmation',
        ),
        icon: 'error',
      });
    } else {
      notify('Connexion échoué', {
        type: 'error',
      });
    }
  } else
    notify('Connexion échoué', {
      type: 'error',
    });
};

export const handleRegisterError = (
  res: FormattedResponse<ResponseErrorAPi>,
) => {
  if (res.nameError === NameErrorKy.HTTP_ERROR) {
    if (res.data.error.code === AuthException.emailExists().code) {
      notify("L'adresse email existe déjà, veuillez entre un autre", {
        type: 'error',
      });
    } else {
      notify('Connexion échoué', {
        type: 'error',
      });
    }
  } else
    notify('Connexion échoué', {
      type: 'error',
    });
};
