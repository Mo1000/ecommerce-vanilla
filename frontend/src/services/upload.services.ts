import ky from 'ky';
import {convertMegabytesToBytes} from "@/utils/fileUtils.ts";
import {transformeResponseApi} from "@/utils/transformeResponseApi.ts";
import {UploadCloudinaryResponse} from "@/models/upload.model.ts";
import {ResponseErrorAPi} from "@/models/handleErrorApi/error-api.model.ts";
import {FormattedResponse} from "@/models/api-response.model.ts";

abstract class UploadServices {
  static async uploadFile(file: File): Promise<FormattedResponse<string>> {
    if (!file)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw transformeResponseApi<any>(
        false,
        new Error('Le fichier est obligatoire'),
      );
    if (
      (file?.size || 0) >
      convertMegabytesToBytes(import.meta.env.VITE_PUBLIC_MAX_FILE_SIZE)
    )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw transformeResponseApi<any>(
        false,
        new Error(
          `le fichier ne doit pas dépasser ${import.meta.env.VITE_PUBLIC_MAX_FILE_SIZE}Mo`,
        ),
      );
    const formData = new FormData();
    formData.append('file', file);
    formData.append(
      'upload_preset',
      import.meta.env.VITE_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    );
    formData.append('folder', import.meta.env.VITE_PUBLIC_CLOUDINARY_FOLDER);
    try {
      const res: UploadCloudinaryResponse = await ky
        .post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
          {
            timeout: 300000,
            body: formData,
          },
        )
        .json();
      return transformeResponseApi<string>(true, res.secure_url);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.name === 'HTTPError') {
        throw transformeResponseApi<ResponseErrorAPi>(
          false,
          await error.response.json(),
          error.name,
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw transformeResponseApi<any>(false, error);
    }
  }
}

export default UploadServices;
