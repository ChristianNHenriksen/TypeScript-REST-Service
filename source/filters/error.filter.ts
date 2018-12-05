import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const guard = (endpoint: (req: Request, res: Response, next: NextFunction) => void) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(endpoint(req, res, next)).catch(next);
};

export class ValidationError implements Error {
    name: string;
    message: string;
    stack?: string;

    constructor(message: string) { this.message = message; }
}

export class NotFoundError implements Error {
    name: string;
    message: string;
    stack?: string;

    constructor(message: string) { this.message = message; }
}

export const ErrorFilter = {
    create(silent: boolean): ErrorRequestHandler {
        return (error, request, response, next) => {
            if ( !silent )
                console.error(error);

            if (error instanceof ValidationError)
                return response.status(400).end(error.message);

            if (error instanceof NotFoundError)
                return response.status(404).end(error.message);

            if ( error instanceof Error )
                return response.status(500).end(error.message);

            response.status(500).end(error);
        };
    }
};
