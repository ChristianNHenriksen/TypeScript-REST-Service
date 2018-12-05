import * as chai from "chai";
const should = chai.should();

import * as http from "http";
import * as agent from "superagent";

import { CarRouter } from "../../source/car/car.router";
import { Server } from "../../source/server";

describe("CarRouter", () => {
    let server: http.Server;

    beforeEach(() => {
        server = Server.create({
            silent: true,
            carRouter: CarRouter()
        }).listen(3030);
    });

    afterEach(() => server.close());

    describe("Get cars |GET /cars", () => {
        it("should get cars", () => {
            return agent.get("http://localhost:3030/cars")
                .catch(error => error.response)
                .then(response => {
                    response.body.should.deep.equal([{ speed: 100 }]);
                    response.status.should.equal(200);
                });
        });
    });

    describe("Get car |GET /cars/{id}", () => {
        it("should get cars", () => {
            return agent.get("http://localhost:3030/cars/001")
                .catch(error => error.response)
                .then(response => {
                    response.body.should.deep.equal({ id: "001", speed: 100 });
                    response.status.should.equal(200);
                });
        });
    });

    describe("Add car | POST /cars", () => {
        it("should add car", () => {
            return agent.post("http://localhost:3030/cars")
                .send({ speed: 100 })
                .catch(error => error.response)
                .then(response => {
                    response.body.should.deep.equal({ speed: 100 });
                    response.status.should.equal(201);
                });
        });
    });

    describe("Edit car | PUT /cars/{id}", () => {
        it("should edit car", () => {
            return agent.put("http://localhost:3030/cars/001")
                .send({ speed: 101 })
                .catch(error => error.response)
                .then(response => {
                    response.body.should.deep.equal({ id: "001", speed: 101 });
                    response.status.should.equal(200);
                });
        });
    });

    describe("Delete car | DELETE /cars", () => {
        it("should delete car", () => {
            return agent.put("http://localhost:3030/cars/1")
                .catch(error => error.response)
                .then(response => {
                    response.status.should.equal(200);
                });
        });
    });
});
