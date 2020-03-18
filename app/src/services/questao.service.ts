import Questao, { iQuestao } from "../models/Questao";
import { DestroyOptions, UpdateOptions } from "sequelize";

class QuestaoServiceError extends Error {
    constructor(name: string, message: string, stack?: object) {
        super(message);
        this.name = name;
        stack ? this.stack : false;
    }
}

export default class QuestaoService {

    public store = async (questaoNew: iQuestao): Promise<Questao> => {
        return Questao.create(questaoNew);
    }

    public findById = async (idQuestao: number): Promise<Questao> => {
        return Questao.findByPk(idQuestao);
    }

    public destroy = async (idQuestao: number): Promise<Questao> => {
        let questaoFinded: Questao;
        let questaoRowsDestroyed: number;
        let destroyOptions: DestroyOptions;

        questaoFinded = await this.findById(idQuestao);
        if (questaoFinded) {
            destroyOptions = { where: { id: idQuestao } };
            questaoRowsDestroyed = await Questao.destroy(destroyOptions);
            if (questaoRowsDestroyed == 1) {
                return Promise.resolve(questaoFinded);
            } else {
                return Promise.reject(new QuestaoServiceError("Destroy Error", "Questao not destroyed"));
            }
        } else {
            return Promise.reject(new QuestaoServiceError("Destroy Error", "User not found"));
        }
    }

    public update = async (idQuestao: number, questaoToBeUpdated: iQuestao): Promise<Questao> => {
        let questaoFinded: Questao;
        let updateOptions: UpdateOptions;
        let questaoIsUpdated: Object | any;

        //buscar Questao e verificar se existe
        questaoFinded = await this.findById(idQuestao);
        if (questaoFinded) {
            updateOptions = { where: { id: idQuestao } };
            questaoIsUpdated = await Questao.update(questaoToBeUpdated, updateOptions);
            if (questaoIsUpdated[0] == 1) {
                await questaoFinded.reload();
                return Promise.resolve(questaoFinded);
            } else {
                return Promise.reject(new QuestaoServiceError("Update Error", "questao not updated", { err: questaoIsUpdated }))
            }
        } else {
            return Promise.reject(new QuestaoServiceError("Update Error", "questao not found"));
        }
    }


}

