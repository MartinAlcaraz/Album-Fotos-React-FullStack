import { Router } from "express";
import picturesCtrl from "../controllers/pictures.controller.js";
const { getPictures, postPicture, putPicture, deletePicture, getOnePicture } = picturesCtrl;
const router = Router();

router.route('/')
    .post(postPicture);
router.route('/:id')
    .get(getPictures)
    .put(putPicture)
    .delete(deletePicture)

export default router;