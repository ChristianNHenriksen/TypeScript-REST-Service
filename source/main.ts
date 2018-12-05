import { Server } from "./server";

import { CarRouter } from "./car/car.router";

async function main() {
    Server.create({
        silent: false,
        carRouter: CarRouter()
    }).listen(3000, () => {
        console.log("Listening on port 3000");
    });
}

main();
