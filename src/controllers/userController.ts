import { Request, Response } from "express"
import { getALlUsers, handleCreateUser, handleDeleteUser ,getUserById} from "../services/userServices";

const getHomePage = async (req: Request, res: Response) => {
    // get users
    const users = await getALlUsers();
    // console.log("Check user" , users)
    return res.render("home.ejs", {
        users: users
    });
}

const getCreateUserPage = async (req: Request, res: Response) => {

    return res.render("createUser.ejs");
}
const postCreateUserPage = async (req: Request, res: Response) => {
    // console.log("check data : " , req.body  )
    // return res.render("home.ejs");
    const { fullName, email, address } = req.body
    //handle create user
    await handleCreateUser(fullName, email, address);
    return res.redirect('/')
}
const postDeleteUser = async (req: Request, res: Response) => {
    // console.log(req.params.id);
    const { id } = req.params;
    await handleDeleteUser(id)
    return res.redirect('/')
}
const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await getUserById(id) ;
  
    return res.render("viewUser.ejs" ,{
        id : id  ,
        user :  user
    })
}
export {
    getHomePage,
    getCreateUserPage,
    postCreateUserPage,
    postDeleteUser,
    getViewUser
}    