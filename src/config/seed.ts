import { hashPassword } from "src/services/userServices";
import { prisma } from "./client";
import { ACCOUNT_TYPE } from "./constant";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();

    if (countUser === 0) {
        await prisma.user.createMany({
            data: [
                {
                    fullName : "Nhat Bang" ,
                    username: "nhatbang24112003@gmail.com",
                    password: await hashPassword("123456"),
                    accountType: ACCOUNT_TYPE.SYSTEM,
                },
                {
                    fullName: "Admin",
                    username: "admin@gmail.com",
                    password: await hashPassword("123456"),
                    accountType: ACCOUNT_TYPE.SYSTEM,
                },
            ],
        });
    }

    if (countRole === 0) {
        await prisma.role.createMany({
            data: [
                {
                    name: "ADMIN",
                    description: "ADMIN thi full quyen",
                },
                {
                    name: "USER",
                    description: "USER thong thuong",
                },
            ],
        });
    }

    if (countUser > 0 && countRole > 0) {
        console.log("Already Init Data...");
    }
};

export default initDatabase;
