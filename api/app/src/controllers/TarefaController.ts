import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import { Op } from "sequelize";
import { Tarefa } from "../models/Tarefa";

export default class TarefaController {
    constructor () { }

    public async listar(req: Request, res: Response) {
        try {

            let user: any = req.user;

            let retorno = await Tarefa.findAll({
                where: {
                    cod_usuario: user.cod_usuario
                },
                attributes: [
                    'cod_tarefa',
                    'tarefa',
                    [ Sequelize.literal('TIME_FORMAT(horario, "%H:%i")'), 'horario' ],
                    'prioridade',
                    'concluida'
                ],
                order: [
                    [ 'horario', 'ASC' ]
                ]
            });

            res.status(200).json(retorno);

        } catch (error: any) {
            res.status(412).json({ message: error.message });
        }
    };

    public async listarPrioridades(req: Request, res: Response) {
        try {

            let user: any = req.user;

            let retorno = await Tarefa.findAll({
                where: {
                    cod_usuario: user.cod_usuario,
                    prioridade: true
                },
                attributes: [
                    'cod_tarefa',
                    'tarefa',
                    [ Sequelize.literal('TIME_FORMAT(horario, "%H:%i")'), 'horario' ],
                    'prioridade',
                    'concluida'
                ],
                order: [
                    [ 'horario', 'ASC' ]
                ]
            });

            res.status(200).json(retorno);

        } catch (error: any) {
            res.status(412).json({ message: 'Não foi possível completar a requisição' });
        }
    };

    public async detalhar(req: Request, res: Response) {
        try {
            let user: any = req.user;

            let retorno = await Tarefa.findAll({
                where: {
                    cod_usuario: user.cod_usuario,
                    tarefa: {
                        [ Op.like ]: `%${req.body.tarefa}%`
                    }
                },
                attributes: [
                    'cod_tarefa',
                    'tarefa',
                    [ Sequelize.literal('TIME_FORMAT(horario, "%H:%i")'), 'horario' ],
                    'prioridade',
                    'concluida'
                ],
            });

            res.status(200).json(retorno);
        } catch (error: any) {
            res.status(412).json({ message: 'Não foi possível completar a requisição' });
        }
    };

    public async detalharPrioridades(req: Request, res: Response) {
        try {

            let user: any = req.user;

            let retorno = await Tarefa.findAll({
                where: {
                    cod_usuario: user.cod_usuario,
                    tarefa: {
                        [ Op.like ]: `%${req.body.tarefa}%`
                    },
                    prioridade: true
                },
                attributes: [
                    'cod_tarefa',
                    'tarefa',
                    [ Sequelize.literal('TIME_FORMAT(horario, "%H:%i")'), 'horario' ],
                    'prioridade',
                    'concluida'
                ],
            });

            res.status(200).json(retorno);
        } catch (error: any) {
            res.status(412).json({ message: 'Não foi possível completar a requisição' });
        }
    };

    public async cadastrar(req: Request, res: Response) {
        try {

            let user: any = req.user;

            if (req.body.tarefa.length > 85) {
                throw new Error('A tarefa deve conter até 85 caracteres.');
            };

            await Tarefa.create({
                cod_usuario: user.cod_usuario,
                tarefa: req.body.tarefa,
                horario: req.body.horario,
                prioridade: req.body.prioridade,
            });

            res.status(200).json({ message: 'Tarefa cadastrada com sucesso.' });

        } catch (error: any) {
            res.status(412).json({ message: error.message });
        }
    };

    public async atualizar(req: Request, res: Response) {
        try {

            let user: any = req.user;

            if (req.body.tarefa.length > 85) {
                throw new Error('A tarefa deve conter até 85 caracteres.');
            };

            await Tarefa.update({
                tarefa: req.body.tarefa,
                horario: req.body.horario,
                prioridade: req.body.prioridade,
                concluida: req.body.concluida
            },
                {
                    where: {
                        cod_usuario: user.cod_usuario,
                        cod_tarefa: req.params.id
                    }
                });

            res.status(200).json({ message: 'Tarefa atualizada com sucesso.' });

        } catch (error: any) {
            res.status(412).json({ message: error.message });
        }
    };

    public async deletar(req: Request, res: Response) {
        try {

            let user: any = req.user;

            await Tarefa.destroy({
                where: {
                    cod_usuario: user.cod_usuario,
                    cod_tarefa: req.params.id
                }
            });

            res.status(200).json({ message: 'Tarefa excluída com sucesso.' });

        } catch (error: any) {
            res.status(412).json({ message: 'Não foi possível completar a requisição' });
        }
    };
};