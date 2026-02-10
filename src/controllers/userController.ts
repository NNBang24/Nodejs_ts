import  { Request, Response } from "express"
import { getALlUsers, handleCreateUser, handleDeleteUser, getUserById, handleUpdateUserById, getALlRoles } from "../services/userServices";

const getHomePage = async (req: Request, res: Response) => {
  try {
    const users = await getALlUsers();
    return res.render("home.ejs", { users });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
};

const getCreateUserPage = async (req: Request, res: Response) => {
    const roles = await getALlRoles();
    return res.render("admin/user/create.ejs" , {
        roles : roles
    });
}
const postCreateUserPage = async (req: Request, res: Response) => {
    // console.log("check data : " , req.body  )
    // return res.render("home.ejs");
    const { fullName, username, phone ,role ,address } = req.body
    //handle create user
    // await handleCreateUser(fullName, email, address);
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
    const user = await getUserById(id);

    return res.render("viewUser.ejs", {
        id: id,
        user: user
    })
}
const postUpdateUser = async (req: Request, res: Response) => {
    const { fullName, email, address, id } = req.body;

    // update user 
    await handleUpdateUserById(id, fullName, email, address);
    return res.redirect('/')
}
export {
    getHomePage,
    getCreateUserPage,
    postCreateUserPage,
    postDeleteUser,
    getViewUser,
    postUpdateUser
}    