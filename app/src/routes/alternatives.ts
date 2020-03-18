import { Router } from "express";
import AlternativaController from '../controller/alternativa.controller';

const router = Router();
const alternativaController = new AlternativaController();

router.get('/',alternativaController.index);
router.get('/:id', alternativaController.findById);
router.post('/', alternativaController.store);
router.delete('/:id', alternativaController.destroy);
router.put('/:id',alternativaController.update);

export default router;