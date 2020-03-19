import { Router } from "express";

import usuario from "./usuario";
import alternativa from './alternativa';

import questao from './questao';

const router = Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' })
});

router.use('/usuario', usuario)
router.use('/alternativa', alternativa);
router.use('/questao', questao);


export default router;