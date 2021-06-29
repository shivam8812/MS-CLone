import router from './router'
import {registercontroller,loginController} from '../controller/usercontroller'
import { authenticatetoken } from '../controller/jwtauth';


router.post('/register',registercontroller);
router.post('/login',loginController);
router.post('/checktoken',authenticatetoken,function(req,res){
    return res.status(200).json(req.user);
})
export default router;