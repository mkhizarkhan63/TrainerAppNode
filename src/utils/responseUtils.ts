
export interface ResponseDTO {
    data: any,
    message: string
};


export const successResponse = (message: string, statuscode: number, data: any = null) => {
    return {
        statuscode,
        status: 'success',
        message,
        data,
    };
};

export const errorResponse = (message: string, statuscode: number, error: any = null) => {
    return {
        statuscode,
        status: 'error',
        message,
        error: error ? error.toString() : null,
    };
};
