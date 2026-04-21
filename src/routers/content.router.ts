import express from 'express'
import { createContent, deleteContent, getAllContent, getContent, getShareContent, shareContent } from '../controller/content.controller.ts';
import isuserSigned from '../middlewares/isSignedIn.ts';

const router = express.Router();

router.post('/', isuserSigned, createContent);
router.get('/', isuserSigned, getAllContent);
router.get('/:contentId', isuserSigned, getContent);
router.delete('/:contentId', isuserSigned, deleteContent);
router.post('/share', isuserSigned, shareContent);
router.get('/share/:shareHash', getShareContent);

export default router