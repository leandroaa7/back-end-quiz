import Alternativa from "../../src/models/Alternativa";
import app from '../../src/app';
import alternativaMock from '../utils/alternativa.mock';

import truncate from "../utils/truncate";
import request from "supertest";

describe("Alternativa controller", () => {
    beforeEach(async () => {
        await truncate();
    })

    it("should create an alternative using HTTP request", async () => {
        const responseCreate = await request(app)
            .post('/alternativa')
            .send(alternativaMock[0]);

        const alternativaCreated: Alternativa = responseCreate.body;

        expect(alternativaMock[0].peso).toEqual(alternativaCreated["peso"]);
        expect(alternativaMock[0].titulo).toEqual(alternativaCreated["titulo"]);

    });

    it("should find an created alternative by id using HTTP request", async () => {
        const responseCreate = await request(app)
            .post('/alternativa')
            .send(alternativaMock[0]);

        const alternativaCreated: Alternativa = responseCreate.body;
        const urlResponse: string = '/alternativa/' + alternativaCreated.id;
        const responseGetById = await request(app)
            .get(urlResponse);


        expect(alternativaCreated["id"]).toBe(responseGetById.body["id"]);
        expect(alternativaCreated["peso"]).toBe(responseGetById.body["peso"]);
        expect(alternativaCreated["titulo"]).toBe(responseGetById.body["titulo"]);

    });


})