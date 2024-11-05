import LanguageModel from "../models/LanguageModel";
import { ResponseDTO } from "../utils/responseUtils";

export const getAllLanguagesQuery = async (): Promise<ResponseDTO> => {

    try {

        const languages = await LanguageModel.findAll();
        return { data: languages, message: '' }
    }
    catch (error: any) {
        throw new Error(error);
    }


}