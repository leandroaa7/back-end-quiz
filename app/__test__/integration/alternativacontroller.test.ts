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

        expect(responseCreate.status).toBe(200);
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

        expect(responseGetById.status).toBe(200);
        expect(alternativaCreated["id"]).toBe(responseGetById.body["id"]);
        expect(alternativaCreated["peso"]).toBe(responseGetById.body["peso"]);
        expect(alternativaCreated["titulo"]).toBe(responseGetById.body["titulo"]);

    });

    it("should delete an alternative by id using HTTP request", async () => {

        const responseCreate = await request(app)
            .post('/alternativa')
            .send(alternativaMock[0]);
        const alternativaCreated: Alternativa = responseCreate.body;

        const urlResponse: string = '/alternativa/' + alternativaCreated.id;
        const responseDestroy = await request(app)
            .delete(urlResponse);

        expect(responseDestroy.status).toBe(200);
        expect(alternativaCreated["id"]).toBe(responseDestroy.body["id"]);
        expect(alternativaCreated["peso"]).toBe(responseDestroy.body["peso"]);
        expect(alternativaCreated["titulo"]).toBe(responseDestroy.body["titulo"]);
    });

    it("should update an alternative by id using HTTP request", async () => {
        const responseCreate = await request(app)
            .post('/alternativa')
            .send(alternativaMock[0]);
        const alternativaCreated: Alternativa = responseCreate.body;

        const urlResponse: string = '/alternativa/' + alternativaCreated.id;
        const responseUpdate = await request(app)
            .put(urlResponse)
            .send(alternativaMock[1]);
        const alternativaUpdated: Alternativa = responseUpdate.body;


        expect(responseUpdate.status).toBe(200);
        expect(alternativaCreated["id"]).toBe(alternativaUpdated["id"]);
        expect(alternativaUpdated["peso"]).toBe(alternativaMock[1]["peso"]);
        expect(alternativaUpdated["titulo"]).toBe(alternativaMock[1]["titulo"]);

    });

    it("should list all alternatives using HTTP request", async () => {

        const responseCreate = await request(app)
            .post('/alternativa')
            .send(alternativaMock[0]);
        const alternativaCreated1: Alternativa = responseCreate.body;

        const responseCreate2 = await request(app)
            .post('/alternativa')
            .send(alternativaMock[0]);
        const alternativaCreated2: Alternativa = responseCreate2.body;

        const responseIndex = await request(app)
            .get('/alternativa')
        const alternativaIndex: Alternativa[] = responseIndex.body;

        expect(responseIndex.status).toBe(200);
        expect(alternativaIndex[0]["id"]).toBe(alternativaCreated1["id"]);
        expect(alternativaIndex[0]["titulo"]).toBe(alternativaCreated1["titulo"]);
        expect(alternativaIndex[0]["peso"]).toBe(alternativaCreated1["peso"]);

        expect(alternativaIndex[1]["id"]).toBe(alternativaCreated2["id"]);
        expect(alternativaIndex[1]["titulo"]).toBe(alternativaCreated2["titulo"]);
        expect(alternativaIndex[1]["peso"]).toBe(alternativaCreated2["peso"]);

    })


})