import { authenticatetoken } from "../controller/jwtauth";
import router from "./router";
import {getMessageController,postMessageController} from '../controller/messagecontroller'

router.get('/messages',authenticatetoken,getMessageController)
router.post('/messages',authenticatetoken,postMessageController)

export default router