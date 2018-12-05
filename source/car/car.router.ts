import { Router } from "express";

import { guard } from "../filters";

export function CarRouter(): Router {
    const router = Router();

    router.get("/cars", guard(async (request, response, _) => {
        response.status(200).json([{ speed: 100 }]);
    }));

    router.get("/cars/:id", guard(async (request, response, _) => {
        response.status(200).json({ id: request.params.id, speed: 100 });
    }));

    router.post("/cars", guard(async (request, response, _) => {
        response.status(201).json(request.body);
    }));

    router.put("/cars/:id", guard(async (request, response, _) => {
        response.status(200).json({ ...request.body, id: request.params.id });
    }));

    router.delete("/cars/:id", guard(async (request, response, _) => {
        response.status(200).end();
    }));

    return router;
}
