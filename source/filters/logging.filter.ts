import { RequestHandler } from "express";

export const LoggingFilter = {
    create(silent: boolean): RequestHandler {
        return (request, response, next) => {
            if ( silent ) return next();

            const hasBody = Object.keys(request.body).length > 0;
            const body = JSON.stringify(request.body, null, 4);
            console.log(`${request.method} ${request.path}` + (hasBody ? ": " + body : ""));

            next();
        };
    }
};
