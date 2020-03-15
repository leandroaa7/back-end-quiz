import AlternativaService from "../../src/services/alternativa.service";
import alternativaMock from '../utils/alternativa.mock';
//import Alternativa, { alternativaAttributes } from "../../src/models/Alternativa";

describe("Alternativa service", () => {

    it("should create an alternative", async () => {
        const alternativaService = new AlternativaService();
        const alternativaCreated = await alternativaService.store(alternativaMock[0]);

        expect(alternativaMock[0].peso).toEqual(alternativaCreated.dataValues["peso"]);
        expect(alternativaMock[0].titulo).toEqual(alternativaCreated.dataValues["titulo"]);

    });

    it("should find an created alternative by id", async () => {
        const alternativaService = new AlternativaService();
        const alternativaCreated = await alternativaService.store(alternativaMock[0]);
        const alternativaId = alternativaCreated["id"];
        const alternativaFindedById = await alternativaService.store(alternativaId);

        expect(alternativaCreated["id"]).toBe(alternativaFindedById["id"]);
    })
})