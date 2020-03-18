import Questao, { iQuestao } from "../models/Questao";

/* class QuestaoServiceError extends Error {
    constructor(name: string, messagem: string, stack?: object) {
        super(message);
        this.name = name;
        stack ? this.stack : false;
    }
} */

export default class QuestaoService {

    public store = async (questaoNew: iQuestao): Promise<Questao> => {
        return Questao.create(questaoNew);
    }

    public findById = async (idQuestao: number): Promise<Questao> => {
        return Questao.findByPk(idQuestao);
    }


}

