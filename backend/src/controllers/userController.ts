import userServices from "../services/userServices";
import { Request, Response } from "express";

const userController = {
  registerUser: async (req: Request, res: Response) => {
    const { nome, email, senha } = req.body;
    const usuarioExistente = await userServices.getUserByEmail(email);
    if (usuarioExistente) {
      return res.status(409).json({ message: "Usuário já cadastrado" });
    }

    try {
      const newUser = await userServices.registerUser(nome, email, senha);

      if (!newUser) {
        return res.status(500).json({ message: "Erro ao cadastrar usuário" });
      }
      return res
        .status(201)
        .json({ message: "Usuário cadastrado com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro desconhecido ao cadastrar usuário" });
    }
  },

  loguinUser: async (req: Request, res: Response) => {
    const { email, senha } = req.body;
    try {
      const user = await userServices.getUserByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      if (user.senha !== senha) {
        return res.status(401).json({ message: "Senha incorreta" });
      }

      return res.status(200).json({ message: "Login realizado com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro desconhecido ao realizar login" });
    }
  },
};

export default userController;
