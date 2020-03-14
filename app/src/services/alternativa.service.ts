import Alternativa, { iAlternativa } from "../models/Alternativa";
export default class AlternativaService {

    public store = async (alternativa: iAlternativa): Promise<Alternativa> => {
        return Alternativa.create(alternativa)
            .then(result => {
                return result;
            })
            .catch(err => {
                return err;
            })
    }
}