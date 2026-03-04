import { Request, Response } from "express";

const getAminCreateProductPage =async( req : Request , res : Response) => {
    return res.render("/admin/product/create.ejs")
}
const postAminCreateProduct = async (req: Request, res: Response) => {
    const {name} = req.body
    return res.redirect("/admin/product")
}
export {
    getAminCreateProductPage ,
    postAminCreateProduct
}