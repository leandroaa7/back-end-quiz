import { Router } from "express";
import QuestaoController from '../controller/questao.controller';

const router = Router();
const questaoController = new QuestaoController();

//CRUD
router.get('/');
router.post('/', questaoController.store);
router.put('/:id');
router.delete('/id');

router.get('/:id', questaoController.findById);
//router.post('/:id/alternativa'); // criar alternativa(s) e vincular com a questao
//router.get('/:id/:idAlternativa') // vincular alternativa(s) com questao


export default router;