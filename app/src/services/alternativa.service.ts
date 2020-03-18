import Alternativa, { iAlternativa } from "../models/Alternativa";
import { DestroyOptions, UpdateOptions } from "sequelize";

class AlternativaServiceError extends Error {
    constructor(name: string, message: string, stack?: Object) {
        super(message);
        this.name = name;
        stack ? this.stack : false;
    }
}

export default class AlternativaService {

    public store = async (alternativa: iAlternativa): Promise<Alternativa> => {
        return Alternativa.create(alternativa)
            .then(newAlternativa => {
                return newAlternativa;
            })
            .catch(err => {
                return err;
            })
    }

    public findById = async (idAlternativa: number): Promise<Alternativa> => {
        return Alternativa.findByPk<Alternativa>(idAlternativa);
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
        console.log(alternativaToBeUpdated);
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