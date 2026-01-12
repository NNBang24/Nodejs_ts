import express ,{Express}from 'express';
import { getCreateUserPage, getHomePage } from '../controllers/userController';

const router = express.Router();

const webRouters = (app:Express) => {
    router.get('/', 
        getHomePage
    )

    router.get('/create-user', 
        getCreateUserPage
    );
   
    app.use('/' , router)
}
export default webRouters ;

// module.exports = router ;