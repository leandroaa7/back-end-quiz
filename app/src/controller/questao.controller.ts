import { Request, Response } from "express";
import QuestaoService from "../services/questao.service";
import ResponseController from "./response.controller";
import Questao, { iQuestao } from "../models/Questao";

class QuestaoControllerError extends Error {
    constructor(name: string, message: string, stack?: Object) {
        super(message)
        this.name = name;
        stack ? this.stack : false;
    }
}

export default class QuestaoController extends ResponseController {

    private questaoService: QuestaoService;

    constructor() {
        super();
        this.questaoService = new QuestaoService();
    }


    public store = async (req: Request, res: Response) => {
        let questaoNew: iQuestao = req.body;
        await this.questaoService.store(questaoNew)
            .then((questaoCreated: Questao) => {
                this.renderSuccess(res, questaoCreated)
            })
            .catch(err => {
                this.renderError(res,
                    new QuestaoControllerError("Store Error", "Questao not created", err))
            });
    }

    public findById = async (req: Request, res: Response) => {
        let questaoId: string = req.params.id;
        await this.questaoService.findById(Number(questaoId))
            .then((questaoCreated: Questao) => {
                this.renderSuccess(res, questaoCreated)
            })
            .catch(err => {
                this.renderError(res,
                    new QuestaoControllerError("findById Error", "Questao not finded", err))
            });
    }



}