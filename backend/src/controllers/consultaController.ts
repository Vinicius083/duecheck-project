import consultaService from "../services/consultaService";
import { Request, Response } from "express";
import consultarCPF from "../utils/consultarCpfUtil";
import { parseBrDate } from "../utils/dateUtils";
import { Consulta } from "../types/consultaTypes";

const consultaController = {
  getConsultas: async (req: Request, res: Response) => {
    const user_id = Number(req.query.user_id);
    if (!user_id) {
      return res.status(400).json({ error: "user_id é obrigatório" });
    }
    try {
      const consultas = await consultaService.getConsultas(user_id);
      res.status(200).json(consultas);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar consultas" });
    }
  },

  criarConsulta: async (req: Request, res: Response) => {
    const { user_id, cpf } = req.body;

    if (!user_id || !cpf) {
      return res.status(400).json({ error: "user_id e cpf são obrigatórios" });
    }

    try {
      const consultaArray = await consultarCPF(cpf);

      if (!consultaArray || consultaArray.length === 0) {
        return res
          .status(404)
          .json({ message: "Nenhum registro encontrado na tabela." });
      }

      const consulta: Consulta = {
        tipoDeVinculo: consultaArray[0],
        dataDeInicio: parseBrDate(consultaArray[1]),
        dataDeTermino: parseBrDate(consultaArray[2]),
        localizacao: consultaArray[3],
        lotacao: consultaArray[4],
        cargo: consultaArray[5],
      };

      const criarConsulta = await consultaService.criarConsulta(
        user_id,
        cpf,
        consulta
      );

      return res
        .status(201)
        .json({ message: "Consulta criada com sucesso", criarConsulta });
    } catch (error) {
      console.error("Erro ao criar consulta:", error);
      return res
        .status(500)
        .json({ error: "Erro desconhecido ao criar consulta" });
    }
  },

  getConsultaById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).json({ error: "ID é obrigatório" });
    }
    try {
      const consulta = await consultaService.getConsultaById(id);
      if (!consulta) {
        return res.status(404).json({ message: "Consulta não encontrada" });
      }
      return res.status(200).json(consulta);
    } catch (error) {
      res.status(500).json({ error: "Erro desconhecido ao buscar consulta" });
    }
  },

  atualizarConsulta: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { user_id, cpf } = req.body;
    if (!id || !user_id || !cpf) {
      return res
        .status(400)
        .json({ error: "ID, user_id e cpf são obrigatórios" });
    }
    try {
      const consultaArray = await consultarCPF(cpf);

      if (!consultaArray || consultaArray.length === 0) {
        return res
          .status(404)
          .json({ message: "Nenhum registro encontrado na tabela." });
      }

      const consulta: Consulta = {
        tipoDeVinculo: consultaArray[0],
        dataDeInicio: parseBrDate(consultaArray[1]),
        dataDeTermino: parseBrDate(consultaArray[2]),
        localizacao: consultaArray[3],
        lotacao: consultaArray[4],
        cargo: consultaArray[5],
      };

      const atualizarConsulta = await consultaService.atualizarConsulta(
        id,
        cpf,
        consulta
      );
      if (!atualizarConsulta) {
        return res.status(404).json({ message: "Consulta não encontrada" });
      }
      return res
        .status(200)
        .json({ message: "Consulta atualizada com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro desconheicido ao atualizar consulta" });
    }
  },

  deletarConsulta: async (req: Request, res: Response) => {
    const id = Number(req.params);
    if (!id) {
      return res.status(400).json({ error: "ID é obrigatório" });
    }
    try {
      const deletarConsulta = await consultaService.deletarConsulta(id);
      if (!deletarConsulta) {
        return res.status(404).json({ message: "Consulta não encontrada" });
      }
      return res.status(200).json({ message: "Consulta deletada com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Erro desconhecido ao deletar consulta" });
    }
  },
};

export default consultaController;
