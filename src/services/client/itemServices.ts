import { pid } from "process";
import { prisma } from "src/config/client"
import { never } from "zod";

const getProducts = async () => {
    const products = await prisma.product.findMany();
    return products
}
const getProductById = async (id: number) => {
    const product = await prisma.product.findUnique({
        where: { id }
    })
    return product
}
const addProductToCart = async (quantity: number, productId: number, user: Express.User) => {
    // Lấy product
    const product = await prisma.product.findUnique({
        where: { id: productId },
    });

    if (!product) {
        throw new Error("Product not found");
    }


    const cart = await prisma.cart.findUnique({
        where: { userId: user.id },
        include: { cartDetails: true }
    });

    if (cart) {

        await prisma.cart.update({
            where: { id: cart.id },
            data: { sum: { increment: quantity } },
        });


        const currentCartDetail = cart.cartDetails.find(cd => cd.productId === productId);

        if (currentCartDetail) {

            await prisma.cartDetail.update({
                where: { id: currentCartDetail.id },
                data: { quantity: { increment: quantity } },
            });
        } else {

            await prisma.cartDetail.create({
                data: {
                    price: product.price,
                    quantity: quantity,
                    productId: productId,
                    cartId: cart.id,
                },
            });
        }
    } else {

        await prisma.cart.create({
            data: {
                sum: quantity,
                userId: user.id,
                cartDetails: {
                    create: [{
                        price: product.price,
                        quantity: quantity,
                        productId: productId,
                    }],
                },
            },
        });
    }
};

const getProductInCart = async (userId: number) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId
        }
    })
    if (cart) {
        const currentCartDetail = await prisma.cartDetail.findMany({
            where: {
                cartId: cart.id
            },
            include: {
                product: true
            }
        })
        return currentCartDetail
    }
    return [];
}
const deleteProductInCart = async (
    cartDetailId: number,
    userId: number,
    sumCart: number
) => {
    const currentCartDetail = await prisma.cartDetail.findUnique({
        where: { id: cartDetailId }
    })
    const quantity = currentCartDetail?.quantity
    // xóa cartDetail
    await prisma.cartDetail.delete({ where: { id: cartDetailId } });

    if (sumCart === 1) {

        await prisma.cart.delete({ where: { userId } });
    } else {

        await prisma.cart.update({
            where: { userId },
            data: { sum: { decrement: quantity } }, //tru so luong
        });
    }
};
const updateCartDetailBeforeCheckout = async (data: { id: string, quantity: string }[]) => {
    for (let i = 0; i < data.length; i++) {
        await prisma.cartDetail.update({
            where: {
                id: +data[i].id
            },
            data: {
                quantity: +data[i].quantity
            }
        })
    }
}
const handlePlaceOrder = async (
    userId: number,
    receiverName: string,
    receiverAddress: string,
    receiverPhone: string,
    totalPrice: number
) => {


    try {
        // tao transaction 
      await  prisma.$transaction(async (tx) => {
            const cart = await tx.cart.findUnique({
                where: {
                    userId
                },
                include: {
                    cartDetails: true
                }
            })
            if (cart) {

                const dataOrderDetail = cart?.cartDetails?.map(item => ({
                    price: item.price,
                    quantity: item.quantity,
                    productId: item.productId
                })
                ) ?? []
                await tx.order.create({
                    data: {
                        receiverName,
                        receiverAddress,
                        receiverPhone,
                        paymentMethod: "COD",
                        paymentStatus: "PAYMENT_UNPAID",
                        status: "PENDING",
                        totalPrice: totalPrice,
                        userId,
                        orderDetails: {
                            create: dataOrderDetail
                        }
                    }
                })
                // remove cart detail + cart
                await tx.cartDetail.deleteMany({
                    where: {
                        cartId: cart.id
                    }
                })
                // remove cart
                await tx.cart.delete({
                    where: { id: cart.id }
                })
                //check product
                for (let i = 0; i < cart.cartDetails.length; i++) {
                    const productId = cart.cartDetails[i].productId;
                    const product = await tx.product.findUnique({
                        where: {
                            id: productId
                        }
                    })
                    if (!product || product.quantity < cart.cartDetails[i].quantity) {
                        throw new Error(`san pham ${product?.name} khong hoan tai hoac khong du so luong`)
                    }
                    await tx.product.update({
                        where: {
                            id: productId
                        },
                        data: {
                            quantity: {
                                decrement: cart.cartDetails[i].quantity,
                            },
                            sold: {
                                increment: cart.cartDetails[i].quantity
                            }
                        }
                    })
                }
            }
        })
        return ''
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }


}
const getOrderHistory = async (userId: number) => {
    return await prisma.order.findMany({
        where: { userId },
        include: {
            orderDetails: {
                include: {
                    product: true
                }
            }
        }
    })
}
export {
    getProducts,
    getProductById,
    addProductToCart,
    getProductInCart,
    deleteProductInCart,
    updateCartDetailBeforeCheckout,
    handlePlaceOrder,
    getOrderHistory
}