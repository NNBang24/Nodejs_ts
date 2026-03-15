import { emit } from "process";
import { isEmailExist } from "src/services/client/authServices";
import { z } from "zod";
const passwordSchema = z
    .string()
    .min(3, { message: "Password toi thieu 3 ky tu " })
    .max(20, { message: "Password toi da 20 ky tu" })


const emailSchema = z
    .string().email("Email khong dung dinh dang")
    .refine(async (email) => {
        const existingUser = await isEmailExist(email);
        return !existingUser //email chưa tồn tại → hợp lệ
    }, {
        message: " Email da ton tai",
        path: ["email"]
    })
export const RegisterSchema = z.object({
    fullName: z.string().trim().min(3, { message: "Ten khong duoc bo trong , va 3 ky tu tro len" }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
})
    .refine((data) => {
        return data.password === data.confirmPassword
    }, {
        message: "Password confirm khong chinh xac",
        path: ['confirmPassword']
    })

export type TRegisterSchema = z.infer<typeof RegisterSchema>