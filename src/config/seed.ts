import { prisma } from "./client"

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    if (countUser === 0) {
        await prisma.user.createMany({
            data: [
                {
                    username: "nhatbang24112003@gmail.com",
                    password: "123456",
                    accountType: "SYSTEM"
                },
                {
                    username: "nnb@gmail.com",
                    password: "123456",
                    accountType: "SYSTEM"

                }

            ]
        })
    }
    else {
        console.log("Already Int Data...")
    }

}
export default initDatabase