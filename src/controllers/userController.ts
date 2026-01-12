import {Request , Response} from "express"

const getHomePage = async (req: Request, res: Response) => {

    return res.render("home.ejs");
}

const getCreateUserPage = async (req: Request, res: Response) => {

    return res.render("createUser.ejs");
}
export {getHomePage , getCreateUserPage}