"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
;
const successResponse = (message, statuscode, data = null) => {
    return {
        statuscode,
        status: 'success',
        message,
        data,
    };
};
exports.successResponse = successResponse;
const errorResponse = (message, statuscode, error = null) => {
    return {
        statuscode,
        status: 'error',
        message,
        error: error ? error.toString() : null,
    };
};
exports.errorResponse = errorResponse;
