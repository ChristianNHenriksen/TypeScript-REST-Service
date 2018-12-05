import { json } from "body-parser";
import * as express from "express";
import { Express, Router } from "express";

import { ErrorFilter, LoggingFilter } from "./filters";

export const Server = {
    create(parameters: {
        silent: boolean,
        carRouter?: Router
    }): Express {
        const errorFilter = ErrorFilter.create(parameters.silent);
        const loggingFilter = LoggingFilter.create(parameters.silent);

        const app = express();
        app.use(json());
        app.use(loggingFilter);

        if (parameters.carRouter) app.use(parameters.carRouter);

        app.use(errorFilter);

        return app;
    }
};
