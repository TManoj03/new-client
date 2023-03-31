import  express  from "express";
import  {getUser,updateUser,allUser} from "../controllers/usersC.js"; 

const router = express.Router()

router.get('/find/:userId',getUser);
router.put("/",updateUser);
router.get('/get',allUser);

export default router