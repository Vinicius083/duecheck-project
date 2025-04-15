import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const userServices = {
  registerUser: async (nome: string, email: string, senha: string) => {
    const user = await prisma.user.create({
      data: {
        nome,
        email,
        senha,
      },
    });
    return user;
  },

  getUserByEmail: async (email: string) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  },
};

export default userServices;
