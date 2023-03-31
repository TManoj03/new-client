import  express  from "express";
import {searchController} from '../controllers/searchC.js';

const router = express.Router();

router.get('/:q',searchController);

export default router;