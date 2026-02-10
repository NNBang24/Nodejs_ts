import { prisma } from "./client";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();

    if (countUser === 0) {
        await prisma.user.createMany({
            data: [
                {
                    username: "nhatbang24112003@gmail.com",
                    password: "123456",
                    accountType: "SYSTEM",
                },
                {
                    username: "nnb@gmail.com",
                    password: "123456",
                    accountType: "SYSTEM",
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
