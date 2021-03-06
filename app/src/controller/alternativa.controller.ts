import AlternativaService from "../services/alternativa.service";
import Alternativa, { iAlternativa } from "../models/Alternativa";
import { Request, Response } from "express";
import ResponseController from "./response.controller";

class AlternativaControllerError extends Error {
    constructor(name: string, message: string, stack?: Object) {
        super(message);
        this.name = name;
        stack ? this.stack : false;
        //res ? this.res : false;
    }
}

export default class AlternativaController extends ResponseController {
    private alternativaService: AlternativaService;


    constructor() {
        super();
        this.alternativaService = new AlternativaService();
    }

    public store = async (req: Request, res: Response) => {
        let alternativaNew: iAlternativa = req.body;
        await this.alternativaService.store(alternativaNew)
            .then((alternativaCreated: Alternativa) => {
                this.renderSuccess(res, alternativaCreated)
            })
            .catch(err => {
                this.renderError(res,
                    new AlternativaControllerError("Store Error", "Alternative not created", err))
            });
    }

    public findById = async (req: Request, res: Response) => {
        let idAlternativa: string = req.params.id;
        await this.alternativaService.findById(Number(idAlternativa))
            .then((alternativa: Alternativa) => {
                this.renderSuccess(res, alternativa);
            })
            .catch((err: Error) => {
                this.renderError(res,
                    new AlternativaControllerError("findById Error", "Alternative not finded", err))
            })
    }

    public destroy = async (req: Request, res: Response) => {
        let idAlternativa: string = req.params.id;
        await this.alternativaService.destroy(Number(idAlternativa))
            .then((alternativa: Alternativa) => {
                this.renderSuccess(res, alternativa);
            })
            .catch((err: Error) => {
                this.renderError(res,
                    new AlternativaControllerError("destroy Error", "Alternative not destroyed", err))
            })
    }

    public update = async (req: Request, res: Response) => {
        let idAlternativa: string = req.params.id;
        let alternativaToBeUpdated: Alternativa = req.body;
        await this.alternativaService.update(Number(idAlternativa), alternativaToBeUpdated)
            .then((alternativa: Alternativa) => {
                this.renderSuccess(res, alternativa);
            })
            .catch((err: Error) => {
                this.renderError(res,
                    new AlternativaControllerError("update Error", "Alternative not updated", err))
            })
    }

    public index = async (req: Request, res: Response) => { 
        return this.alternativaService.index()
        .then((alternativa: Alternativa[]) => {
            this.renderSuccess(res, alternativa);
        })
        .catch((err: Error) => {
            this.renderError(res,
                new AlternativaControllerError("index Error", "Alternative index", err))
        })
    }


}