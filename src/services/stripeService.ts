import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

export type StipeFormDataType = {
    amount: string,
    currency: string,
    payment_method_types: string
}

export const stripeService = (formData: StipeFormDataType): Promise<any> => {
    return new Promise((resolve, reject) => {
        
       
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

        //Make the request
        request(options, (error: any, response: any) => {
            if (error) {
                reject(new Error(error));
            } else {
                const responseData = JSON.parse(response.body);
                resolve(responseData); // Resolve with the response body
            }
        });
    });
}