import truncate from "../utils/truncate"
import request from 'supertest';
import questaoMock from '../utils/questao.mock';
import app from '../../src/app';
import Questao from "../../src/models/Questao";

describe("Questao Controller", () => {

    beforeEach(async () => {
        await truncate();
    })


    it("should create a question using HTTP request", async () => {
        //criar uma questão sem o atributo de alternativas
        const questaoNew = {
            titulo: questaoMock[0]["titulo"],
            e_alternativa: questaoMock[0]["e_alternativa"],
            peso: questaoMock[0]["peso"]
        };

        const responseCreate = await request(app)
            .post('/questao')
            .send(questaoNew);
        const questaoCreated: Questao = responseCreate.body;

        expect(responseCreate.status).toBe(200);
        expect(questaoCreated["titulo"]).toBe(questaoNew["titulo"])
        expect(questaoCreated["e_alternativa"]).toBe(questaoNew["e_alternativa"])
        expect(questaoCreated["peso"]).toBe(questaoNew["peso"])

    });

    it("should find a question by id using HTTP request", async () => {
        //criar uma questão sem o atributo de alternativas
        const questaoNew = {
            titulo: questaoMock[0]["titulo"],
            e_alternativa: questaoMock[0]["e_alternativa"],
            peso: questaoMock[0]["peso"]
        };

        const responseCreate = await request(app)
            .post('/questao')
            .send(questaoNew);
        const questaoCreated: Questao = responseCreate.body;

        const urlResponse: string = '/questao/' + questaoCreated.id;
        const responseFinded = await request(app)
            .get(urlResponse);
        const questaoFinded: Questao = responseFinded.body;

        expect(responseFinded.status).toBe(200);
        expect(questaoFinded["id"]).toBe(questaoCreated["id"]);
        expect(questaoFinded["peso"]).toBe(questaoCreated["peso"]);
        expect(questaoFinded["titulo"]).toBe(questaoCreated["titulo"])
        expect(questaoFinded["e_alternativa"]).toBe(questaoCreated["e_alternativa"])
    });

})