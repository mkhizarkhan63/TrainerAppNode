import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export type StipeFormDataType = {
    amount: string,
    currency: string,
    payment_method_types: string
}

export const stripeService = async (formData: StipeFormDataType) => {
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
    return request(options, function (error: any, response: any) {
        if (error) throw new Error(error);
        return response.body;
    });
}