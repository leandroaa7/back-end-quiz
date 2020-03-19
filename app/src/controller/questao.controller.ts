import { Request, Response } from "express";
import QuestaoService from "../services/questao.service";
import AlternativaService from "../services/alternativa.service";
import ResponseController from "./response.controller";
import Questao, { iQuestao } from "../models/Questao";

class QuestaoControllerError extends Error {
    public err: Object;
    constructor(name: string, message: string, stack?: Object) {
        super(message)
        this.name = name;
        stack ? this.stack : false;
        this.err = { name: this.name, message: this.message, stack: this.stack };
    }
}

export default class QuestaoController extends ResponseController {

    private questaoService: QuestaoService;
    private alternativaSerivce: AlternativaService;

    constructor() {
        super();
        this.questaoService = new QuestaoService();
        this.alternativaSerivce = new AlternativaService();
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
        let questaoCreated = await this.questaoService.findById(Number(questaoId))
        if (questaoCreated) {
            let alternativaListFinded = await this.alternativaSerivce.findByQuestaoId(questaoCreated.id);
            if (alternativaListFinded) {
                questaoCreated.dataValues.alternativa_list = alternativaListFinded;
                this.renderSuccess(res,questaoCreated);
            } else {
                this.renderError(res,
                    new QuestaoControllerError("findByQuestaoId Error", "Alternatives not finded in Questao/findById"))
            }
        } else {
            this.renderError(res,
                new QuestaoControllerError("findById Error", "Questao not finded"))
        }

    }



}