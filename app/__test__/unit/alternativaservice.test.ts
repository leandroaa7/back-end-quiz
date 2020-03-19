import AlternativaService from "../../src/services/alternativa.service";
import alternativaMock from '../utils/alternativa.mock';
import { iAlternativa } from "../../src/models/Alternativa";
import truncate from '../utils/truncate';

import QuestaoService from "../../src/services/questao.service";
import questaoMock from '../utils/questao.mock';

describe("Alternativa service", () => {

    beforeEach(async () => {
        await truncate();
    })

    it("should create an alternative", async () => {
        const alternativaService = new AlternativaService();
        const alternativaCreated = await alternativaService.store(alternativaMock[0]);

        expect(alternativaMock[0].peso).toEqual(alternativaCreated.dataValues["peso"]);
        expect(alternativaMock[0].titulo).toEqual(alternativaCreated.dataValues["titulo"]);

    });

    it("should find an created alternative by id", async () => {
        const alternativaService = new AlternativaService();
        const alternativa = alternativaMock[0];
        const alternativaCreated = await alternativaService.store(alternativa);
        const alternativaId = alternativaCreated["id"];
        const alternativaFindedById = await alternativaService.findById(alternativaId);

        expect(alternativaCreated["id"]).toBe(alternativaFindedById["id"]);
        expect(alternativaCreated["peso"]).toBe(alternativaFindedById["peso"]);
        expect(alternativaCreated["titulo"]).toBe(alternativaFindedById["titulo"]);

    });

    it("should delete an alternative by id", async () => {
        const alternativaService = new AlternativaService();
        const alternativaCreated = await alternativaService.store(alternativaMock[0]);
        const alternativaId = alternativaCreated.id;
        const alternativaDeleted = await alternativaService.destroy(alternativaId);

        expect(alternativaCreated["id"]).toBe(alternativaDeleted["id"]);
        expect(alternativaCreated["peso"]).toBe(alternativaDeleted["peso"]);
        expect(alternativaCreated["titulo"]).toBe(alternativaDeleted["titulo"]);
    });

    it("should update an alternative by id", async () => {
        const alternativaService = new AlternativaService();
        const alternativaCreated = await alternativaService.store(alternativaMock[0]);
        const alternativaId = alternativaCreated.id;
        const alternativaUpdated = await alternativaService.update(alternativaId, alternativaMock[1]);

        expect(alternativaCreated["id"]).toBe(alternativaUpdated["id"]);
        expect(alternativaUpdated["peso"]).toBe(alternativaMock[1]["peso"]);
        expect(alternativaUpdated["titulo"]).toBe(alternativaMock[1]["titulo"]);

    });

    it("should list all alternatives", async () => {
        const alternativaService = new AlternativaService();
        const alternativaCreated1 = await alternativaService.store(alternativaMock[0]);
        const alternativaCreated2 = await alternativaService.store(alternativaMock[1]);
        const alternativaIndex = await alternativaService.index();

        expect(alternativaIndex[0]["id"]).toBe(alternativaCreated1["id"]);
        expect(alternativaIndex[0]["titulo"]).toBe(alternativaCreated1["titulo"]);
        expect(alternativaIndex[0]["peso"]).toBe(alternativaCreated1["peso"]);

        expect(alternativaIndex[1]["id"]).toBe(alternativaCreated2["id"]);
        expect(alternativaIndex[1]["titulo"]).toBe(alternativaCreated2["titulo"]);
        expect(alternativaIndex[1]["peso"]).toBe(alternativaCreated2["peso"]);

    })

    it("should find alternatives by QuestaoId", async () => {
        const questaoService = new QuestaoService();
        const alternativaService = new AlternativaService();

        //create questão

        //create a question withou attribute "alternativas"
        const questaoNew = {
            titulo: questaoMock[0]["titulo"],
            e_alternativa: questaoMock[0]["e_alternativa"],
            peso: questaoMock[0]["peso"]
        };
        const questaoCreated = await questaoService.store(questaoNew);

        // create alternativa
        let alternativaNew: iAlternativa = alternativaMock[0];
        alternativaNew.QuestaoId = questaoCreated.id;
        const alternativaCreated = await alternativaService.store(alternativaNew);

        //findByQuestaoId

        const alternativaListFindedByQuestaoId =
            await alternativaService.findByQuestaoId(questaoCreated.id);

        expect(alternativaListFindedByQuestaoId[0]["id"]).toBe(alternativaCreated["id"]);
        expect(alternativaListFindedByQuestaoId[0]["titulo"]).toBe(alternativaCreated["titulo"]);
        expect(alternativaListFindedByQuestaoId[0]["peso"]).toBe(alternativaCreated["peso"]);

        expect(alternativaListFindedByQuestaoId[0]["QuestaoId"]).toBe(questaoCreated["id"]);

    })


})