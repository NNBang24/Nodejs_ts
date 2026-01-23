
import e, { Request, Response } from "express"
import { get } from "http";
import { getALlUsers } from "src/services/userServices";

const getDashboardPage = async (req: Request, res: Response) => {


    return res.render("admin/dashboard/show.ejs");
}
const getAdminUserPage = async (req: Request, res: Response) => {
    const users = await getALlUsers();
    return res.render("admin/user/show.ejs" , {
        users : users
    });
}
const getAdminProductPage = async (req: Request, res: Response) => {
    return res.render("admin/product/show.ejs");
}
const getAdminOrderPage = async (req: Request, res: Response) => {
    return res.render("admin/order/show.ejs");
}
export {getDashboardPage ,getAdminUserPage , getAdminProductPage , getAdminOrderPage}