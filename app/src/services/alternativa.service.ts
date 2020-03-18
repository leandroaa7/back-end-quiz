import Alternativa, { iAlternativa } from "../models/Alternativa";
import { DestroyOptions } from "sequelize";

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
    }
}