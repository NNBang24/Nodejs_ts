import { assert } from "console"
import { prisma } from "../../config/client"
const createProduct = async (
    name: string,
    price: number,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string,
    imageUpload: string
) => {
    await prisma.product.create({
        data : {
            name ,
            price ,
            detailDesc ,
            shortDesc ,
            quantity ,
            factory , 
            target ,
            ...(imageUpload && {image : imageUpload})
        }
    })
} 
const getProductList =async()  => {
    return await prisma.product.findMany()
}

// const handleDeleteProduct = async(id : string) => {
//     const deleteProduct = await prisma.product.delete({
//         where : {
//             id : +id
//         }
//     })
//     return deleteProduct
// }
const handleDeleteProduct = async (id: string) => {
    try {
        const productId = Number(id)

        await prisma.$transaction(async (tx) => {

            // xoá cart detail
            await tx.cartDetail.deleteMany({
                where: { productId }
            })

            // xoá order detail
            await tx.orderDetail.deleteMany({
                where: { productId }
            })

            // xoá product
            await tx.product.delete({
                where: { id: productId }
            })
        })

        return "delete success"

    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
            return error.message
        }
    }
}
const getProductById = async(id : string) => {
    const getProductById = await prisma.product.findUnique({
        where : {
            id : +id
        }
    })
    return getProductById
}
const updateProductById = async(
    id : number ,
    name: string,
    price: number,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string,
    imageUpload: string
) => {
    await prisma.product.update({
        where : {id} ,
        data : {
            id ,
            name , 
            price ,
            detailDesc ,
            shortDesc ,
            quantity , 
            factory ,
            target ,
            ...(imageUpload && {image : imageUpload})
        }
    })
}
export {
    createProduct ,
    getProductList ,
    handleDeleteProduct,
    getProductById ,
    updateProductById
}