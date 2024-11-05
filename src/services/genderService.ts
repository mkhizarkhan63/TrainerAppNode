import GenderModel from "../models/GenderModel";
import { ResponseDTO } from "../utils/responseUtils";


export const getAllGendersQuery = async (): Promise<ResponseDTO> => {

    try {
        const data = await GenderModel.findAll();
        return { data: data, message: '' }

    } catch (error: any) {
        throw new Error(error);
    }

}