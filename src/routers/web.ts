import express ,{Express}from 'express';
import { getCreateUserPage, getHomePage, postCreateUserPage, postDeleteUser, getViewUser } from '../controllers/userController';

const router = express.Router();

const webRouters = (app:Express) => {
    router.get('/', 
        getHomePage
    )

    router.get('/create-user', 
        getCreateUserPage
    );
    router.post('/post-create-user',
        postCreateUserPage
    );
    router.post('/handle-delete-user/:id' ,
        postDeleteUser 
    )
    router.get('/handle-view-user/:id' ,
        getViewUser 
    )
   
    app.use('/' , router)
}
export default webRouters ;

// module.exports = router ;