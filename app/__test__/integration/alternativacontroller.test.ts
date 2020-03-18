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
        const response = await request(app)
        .post('/alternativa')
        .send(alternativaMock[0]);

        const alternativaCreated: Alternativa = response.body;

        expect(alternativaMock[0].peso).toEqual(alternativaCreated["peso"]);
        expect(alternativaMock[0].titulo).toEqual(alternativaCreated["titulo"]);

    })
})