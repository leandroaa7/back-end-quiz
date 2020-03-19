import questaoMock from "../utils/questao.mock";
import QuestaoService from "../../src/services/questao.service";
import truncate from "../utils/truncate";

describe("Questao Service", () => {

    beforeEach(async () => {
        await truncate();
    })


    it("should create a question", async () => {
        const questaoService = new QuestaoService();
        //criar uma questão sem o atributo de alternativas
        const questaoNew = {
            titulo: questaoMock[0]["titulo"],
            e_alternativa: questaoMock[0]["e_alternativa"],
            peso: questaoMock[0]["peso"]
        };

        const questaoCreated = await questaoService.store(questaoNew);

        expect(questaoCreated["titulo"]).toBe(questaoNew["titulo"])
        expect(questaoCreated["e_alternativa"]).toBe(questaoNew["e_alternativa"])
        expect(questaoCreated["peso"]).toBe(questaoNew["peso"])

    });

    it("should find a question by id", async () => {
        const questaoService = new QuestaoService();
        //criar uma questão sem o atributo de alternativas
        const questaoNew = {
            titulo: questaoMock[0]["titulo"],
            e_alternativa: questaoMock[0]["e_alternativa"],
            peso: questaoMock[0]["peso"]
        };

        const questaoCreated = await questaoService.store(questaoNew);
        const idQuestao = questaoCreated["id"];
        const questaoFinded = await questaoService.findById(idQuestao);

        expect(questaoFinded["id"]).toBe(questaoCreated["id"]);
        expect(questaoFinded["peso"]).toBe(questaoCreated["peso"]);
        expect(questaoFinded["titulo"]).toBe(questaoCreated["titulo"])
        expect(questaoFinded["e_alternativa"]).toBe(questaoCreated["e_alternativa"])
    });

    it("shoud destroy a question by id", async () => {
        const questaoService = new QuestaoService();
        //criar uma questão sem o atributo de alternativas
        const questaoNew = {
            titulo: questaoMock[0]["titulo"],
            e_alternativa: questaoMock[0]["e_alternativa"],
            peso: questaoMock[0]["peso"]
        };

        const questaoCreated = await questaoService.store(questaoNew);
        const idQuestao = questaoCreated["id"];
        const questaoDestroyed = await questaoService.destroy(idQuestao);


        expect(questaoDestroyed["id"]).toBe(questaoCreated["id"]);
        expect(questaoDestroyed["peso"]).toBe(questaoCreated["peso"]);
        expect(questaoDestroyed["titulo"]).toBe(questaoCreated["titulo"])
        expect(questaoDestroyed["e_alternativa"]).toBe(questaoCreated["e_alternativa"])
    });


    it("shoud update a question", async ()=>{
        const questaoService = new QuestaoService();
        //criar uma questão sem o atributo de alternativas
        const questaoNew = {
            titulo: questaoMock[0]["titulo"],
            e_alternativa: questaoMock[0]["e_alternativa"],
            peso: questaoMock[0]["peso"]
        };

        const questaoCreated = await questaoService.store(questaoNew);
        const idQuestao = questaoCreated["id"];
        
        //alterar questão criada
        const questaoUpdate = {
            titulo: questaoMock[1]["titulo"],
            e_alternativa: questaoMock[1]["e_alternativa"],
            peso: questaoMock[1]["peso"]
        }

        const questaoUpdated = await questaoService.update(idQuestao,questaoUpdate);

        expect(questaoUpdated["id"]).toBe(questaoCreated["id"]);
        expect(questaoUpdated["peso"]).toBe(questaoUpdate["peso"]);
        expect(questaoUpdated["titulo"]).toBe(questaoUpdate["titulo"])
        expect(questaoUpdated["e_alternativa"]).toBe(questaoUpdate["e_alternativa"])

    })


})