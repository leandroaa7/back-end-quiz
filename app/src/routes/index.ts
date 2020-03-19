import { Router } from "express";

import usuario from "./users";
import alternativa from './alternative';

import questao from './question';

const router = Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' })
});

router.use('/usuario', usuario)
router.use('/alternativa', alternativa);
router.use('/questao', questao);


export default router;