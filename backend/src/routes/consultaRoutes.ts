import consultaController from "../controllers/consultaController";
import { Router } from "express";
import { Request, Response } from "express";

const router = Router();

/**
 * @swagger
 * /consulta:
 *   get:
 *     summary: Retorna todas as consultas feitas por um usuário
 *     tags: [Consulta]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de consultas
 *       404:
 *         description: Nenhuma consulta encontrada
 */
router.get("/", (req: Request, res: Response) => {
  consultaController.getConsultas(req, res);
});

/**
 * @swagger
 * /consulta:
 *   post:
 *     summary: Cria uma nova consulta
 *     tags: [Consulta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: ID do usuário
 *               cpf:
 *                 type: string
 *                 description: CPF do usuário
 *     responses:
 *       201:
 *         description: Consulta criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", (req: Request, res: Response) => {
  consultaController.criarConsulta(req, res);
});

/**
 * @swagger
 * /consulta/{id}:
 *   get:
 *     summary: Retorna uma consulta pelo ID
 *     tags: [Consulta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da consulta
 *     responses:
 *       200:
 *         description: Dados da consulta
 *       404:
 *         description: Consulta não encontrada
 */
router.get("/:id", (req: Request, res: Response) => {
  consultaController.getConsultaById(req, res);
});

/**
 * @swagger
 * /consulta/{id}:
 *   put:
 *     summary: Atualiza uma consulta existente
 *     tags: [Consulta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da consulta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               cpf:
 *                 type: string
 *     responses:
 *       200:
 *         description: Consulta atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.put("/:id", (req: Request, res: Response) => {
  consultaController.atualizarConsulta(req, res);
});

/**
 * @swagger
 * /consulta/{id}:
 *   delete:
 *     summary: Remove uma consulta pelo ID
 *     tags: [Consulta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da consulta
 *     responses:
 *       200:
 *         description: Consulta removida com sucesso
 *       404:
 *         description: Consulta não encontrada
 */
router.delete("/:id", (req: Request, res: Response) => {
  consultaController.deletarConsulta(req, res);
});

export default router;
