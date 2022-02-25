import express from 'express';
const router = express.Router();
import somethingController from '../controllers/something.controller.js'

router.get("/", somethingController.index);

export default router;
