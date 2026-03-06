import {z} from "zod" ;

export const ProductSchema = z.object({
    id: z.string().optional() ,
    name : z.string().trim().min(1,{message :"Ten khong duoc bo trong"}) ,
    price: z.string().transform((val) => (val === '' ? 0 : Number(val))).refine((num) => num > 0 ,{message : "So tien toi thieu la 1"}) ,
    detailDesc: z.string().trim().min(1, { message: "detailDesc khong duoc bo trong" }),
    shortDesc: z.string().trim().min(1, { message: "shortDesc khong duoc bo trong" }),
    quantity: z.string().transform((val) => (val === '' ? 0 : Number(val))).refine((num) => num > 0, { message: "So luong toi thieu la 1" }),
    factory: z.string().trim().min(1, { message: "factory khong duoc bo trong" }),
    target: z.string().trim().min(1, { message: "target khong duoc bo trong" }), 

}) ;

export type TProductSchema = z.infer<typeof ProductSchema> 