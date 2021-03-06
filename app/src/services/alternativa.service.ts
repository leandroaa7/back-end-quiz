import Alternativa, { iAlternativa } from "../models/Alternativa";
import { DestroyOptions, UpdateOptions, FindOptions } from "sequelize";

class AlternativaServiceError extends Error {
    constructor(name: string, message: string, stack?: Object) {
        super(message);
        this.name = name;
        stack ? this.stack : false;
    }
}

export default class AlternativaService {

    public index = async (): Promise<Alternativa[]> => {
        return Alternativa.findAll<Alternativa>();
    };

    public store = async (alternativa: iAlternativa): Promise<Alternativa> => {
        return Alternativa.create(alternativa)
            .then(newAlternativa => {
                return newAlternativa;
            })
            .catch(err => {
                return Promise.reject(new AlternativaServiceError("Store Error", "Alternativa not created", { err: err }))
            })
    };

    public storeMany = async (alternativas: iAlternativa[]) => {
        return Alternativa.bulkCreate(alternativas);
    }

    public findById = async (idAlternativa: number): Promise<Alternativa> => {
        return Alternativa.findByPk<Alternativa>(idAlternativa);
    }

    public findByQuestaoId = async (idQuestao: number): Promise<Alternativa[]> => {
        const findOptions: FindOptions = {
            where: {
                QuestaoId: idQuestao
            }
        }
        return Alternativa.findAll<Alternativa>(findOptions);
    }

    public destroy = async (idAlternativa: number): Promise<Alternativa> => {
        let alternativaFinded: Alternativa;
        let destroyRowsNumber: number;
        let destroyOptions: DestroyOptions;

        alternativaFinded = await this.findById(idAlternativa);

        if (alternativaFinded) {
            destroyOptions = {
                where: { id: idAlternativa }
            };
            destroyRowsNumber = await Alternativa.destroy(destroyOptions);
            if (destroyRowsNumber == 1) {
                return alternativaFinded;
            } else {
                return Promise.reject(new AlternativaServiceError("Destroy Error", "Alternativa not destroyed", { "destroyRowsNumber": destroyRowsNumber }))
            }
        } else {
            return Promise.reject(new AlternativaServiceError("Destroy Error", "alternativa not found"));
        }
    };

    public update = async (idAlternativa: number, alternativaToBeUpdated: iAlternativa): Promise<Alternativa> => {
        let alternativaFinded: Alternativa;
        let updateOptions: UpdateOptions;
        let alternativaIsUpdated: Object | any;

        //buscar alternativa e verificar se existe
        alternativaFinded = await this.findById(idAlternativa);
        if (alternativaFinded) {
            updateOptions = { where: { id: idAlternativa } };
            alternativaIsUpdated = await Alternativa.update(alternativaToBeUpdated, updateOptions);
            if (alternativaIsUpdated[0] == 1) {
                await alternativaFinded.reload();
                return Promise.resolve(alternativaFinded);
            } else {
                return Promise.reject(new AlternativaServiceError("Update Error", "Alternativa not updated", { err: alternativaIsUpdated }))
            }
        } else {
            return Promise.reject(new AlternativaServiceError("Update Error", "Alternativa not found"));
        }
    }
}