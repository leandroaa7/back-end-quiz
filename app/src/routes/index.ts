import { Router } from "express";

import usuario from "./users";
import alternativa from './alternatives';

const router = Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' })
});

router.use('/usuario', usuario)
router.use('/alternativa', alternativa);

export default router;