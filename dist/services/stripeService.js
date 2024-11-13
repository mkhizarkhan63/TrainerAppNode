"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
const stripeService = async (formData) => {
    var request = require('request');
    var options = {
        'method': 'POST',
        'url': process.env.STRIPE_URL,
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': process.env.STRIPE_AUTH
        },
        form: {
            'amount': formData.amount,
            'currency': formData.currency,
            'payment_method_types[]': formData.payment_method_types
        }
    };
    return request(options, function (error, response) {
        if (error)
            throw new Error(error);
        return response.body;
    });
};
exports.stripeService = stripeService;
