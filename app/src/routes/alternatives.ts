import { Router } from "express";
import AlternativaController from '../controller/alternativa.controller';

const router = Router();
const alternativaController = new AlternativaController();


router.post('/', alternativaController.store);


export default router;