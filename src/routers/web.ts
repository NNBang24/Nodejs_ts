import express ,{Express}from 'express';
import { getCreateUserPage, getHomePage, postCreateUserPage, postDeleteUser, getViewUser, postUpdateUser } from '../controllers/userController';
import { getDashboardPage ,getAdminUserPage, getAdminProductPage, getAdminOrderPage } from '../controllers/admin/dashboardController';


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
    router.post('/handle-update-user' ,
        postUpdateUser
     )


    // admin router 
    router.get('/admin', getDashboardPage)
    router.get('/admin/user', getAdminUserPage)
    router.get('/admin/create-user',
        getCreateUserPage
    );
    router.post('/admin/post-create-user',
        postCreateUserPage
    );
    router.get('/admin/product', getAdminProductPage)
    router.get('/admin/order', getAdminOrderPage)

    app.use('/' , router)
}
export default webRouters ;

// module.exports = router ;    