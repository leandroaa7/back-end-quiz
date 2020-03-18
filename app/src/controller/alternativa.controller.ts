import AlternativaService from "../services/alternativa.service";
import Alternativa, { iAlternativa } from "../models/Alternativa";
import { Request, Response } from "express";

class AlternativaControllerError extends Error {
    constructor(public name: string, public message: string, public stack?: string) {
        super(message);
        this.name = name;
        stack ? this.stack : false;
        //res ? this.res : false;
    }

    public render = (res: Response) => {
        let body: any = { name: this.name, message: this.message };
        this.stack ? body["stack"] = this.stack : false;
        res.status(500).json(body)
    }
}

export default class AlternativaController {
    private alternativaService: AlternativaService;


    constructor() {
        this.alternativaService = new AlternativaService();
    }

    public store = async (req: Request, res: Response) => {
        let alternativaNew: iAlternativa = req.body;
        await this.alternativaService.store(alternativaNew)
            .then((alternativaCreated: Alternativa) => {
                res.status(200).json(alternativaCreated);
            })
            .catch(err => {
                new AlternativaControllerError("Store Error", "Alternative not created", err).render(res);
            });

    }
}