import { get } from "http";
import { PrismaClient } from "../generated/prisma";
import { Consulta } from "../types/consultaTypes";

const prisma = new PrismaClient();

const consultaService = {
  getConsultas: async (user_id: number) => {
    const consultas = await prisma.consulta.findMany({
      where: {
        user_id: user_id,
      },
    });

    if (!consultas) {
      return null;
    }

    return consultas;
  },

  criarConsulta: async (user_id: number, cpf: string, consulta: Consulta) => {
    const novaConsulta = await prisma.consulta.create({
      data: {
        user_id,
        cpf,
        tipoDeVinculo: consulta.tipoDeVinculo,
        dataDeInicio: consulta.dataDeInicio,
        dataDeTermino: consulta.dataDeTermino,
        localizacao: consulta.localizacao,
        lotacao: consulta.lotacao,
        cargo: consulta.cargo,
      },
    });

    if (!novaConsulta) {
      return null;
    }
    return novaConsulta;
  },

  getConsultaById: async (id: number) => {
    const consulta = await prisma.consulta.findUnique({
      where: {
        id,
      },
    });

    if (!consulta) {
      return null;
    }

    return consulta;
  },

  atualizarConsulta: async (id: number, cpf: string, consulta: Consulta) => {
    console.log("ID da consulta:", id);
    console.log("CPF da consulta:", cpf);
    console.log("Dados da consulta:", consulta);
    const consultaAtualizada = await prisma.consulta.update({
      where: {
        id,
      },
      data: {
        cpf,
        tipoDeVinculo: consulta.tipoDeVinculo,
        dataDeInicio: consulta.dataDeInicio,
        dataDeTermino: consulta.dataDeTermino,
        localizacao: consulta.localizacao,
        lotacao: consulta.lotacao,
        cargo: consulta.cargo,
      },
    });

    if (!consultaAtualizada) {
      return null;
    }

    return consultaAtualizada;
  },

  deletarConsulta: async (id: number) => {
    const consultaDeletada = await prisma.consulta.delete({
      where: {
        id,
      },
    });

    if (!consultaDeletada) {
      return null;
    }

    return consultaDeletada;
  },
};

export default consultaService;
