import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import { Op } from "sequelize";
import { Usuario } from "../models/Usuario";
import bcrypt from 'bcrypt';

export default class UsuarioController {
    constructor () { }

    public async listar(req: Request, res: Response) {
        try {

            let retorno = await Usuario.findAll();

            res.status(200).json(retorno);

        } catch (error: any) {
            res.status(412).json({ message: error.message });
        }
    };

    public async detalhar(req: Request, res: Response) {
        try {
            let user: any = req.user;

            let retorno = await Usuario.findOne({
                where: {
                    login: user.login
                },
            });

            res.status(200).json(retorno);
        } catch (error: any) {
            res.status(412).json({ message: 'Não foi possível completar a requisição' });
        }
    };

    public async cadastrar(req: Request, res: Response) {
        try {

            if (!req.body.nome) {
                throw new Error('O campo "nome" é obrigatório.');
            }

            if (!req.body.login) {
                throw new Error('O campo "login" é obrigatório.');
            }

            if (!req.body.email) {
                throw new Error('O campo "e-mail" é obrigatório.');
            }

            if (!req.body.senha) {
                throw new Error('O campo "senha" é obrigatório.');
            }

            if (!req.body.confirmarSenha) {
                throw new Error('O campo "confirmar senha" é obrigatório.');
            }

            let usuarioCadastrado = await Usuario.findOne({
                where: {
                    email: req.body.email
                }
            });

            if (usuarioCadastrado) {
                throw new Error('E-mail já cadastrado');
            }

            if (req.body.senha != req.body.confirmarSenha) {
                throw new Error('As senhas não conferem.');
            }

            await Usuario.create({
                nome: req.body.nome,
                login: req.body.login,
                email: req.body.email,
                senha: req.body.senha,
            });

            res.status(201).json({ message: req.body });

        } catch (error: any) {
            res.status(412).json({ message: error.message });
        }
    };

    public async atualizar(req: Request, res: Response) {
        try {

            let user: any = req.user;

            let dados: any = {};

            let usuario = await Usuario.findOne({
                where: {
                    cod_usuario: user.cod_usuario
                }
            });

            if (!usuario) {
                throw new Error('Usuario nao encontrado');
            }

            if (req.body.nome) {
                dados.nome = req.body.nome;
            }

            if (req.body.login) {
                dados.login = req.body.login;
            }

            if (req.body.email) {
                dados.email = req.body.email;
            }

            if (req.body.senhaAtual) {

                let senha: any = usuario?.senha;
                let senhaCorreta = await bcrypt.compare(req.body.senhaAtual, senha);

                if (!senhaCorreta) {
                    throw new Error("Senha inválida.");
                }

                if (!req.body.senha) {
                    throw new Error("O campo 'senha' é obrigatório.");
                }

                if (!req.body.confirmarSenha) {
                    throw new Error("O campo 'confirmar senha' é obrigatório.");
                }

                if (req.body.senha != req.body.confirmarSenha) {
                    throw new Error("As senhas não conferem.");
                }

                dados.senha = req.body.senha;
            }

            await usuario.update(dados);

            res.status(200).json({ message: 'Usuario atualizado com sucesso.' });

        } catch (error: any) {
            res.status(412).json({ message: error.message });
        }
    };

    public async deletar(req: Request, res: Response) {
        try {

            let user: any = req.user;

            await Usuario.destroy({
                where: {
                    cod_usuario: user.cod_usuario
                }
            });

            res.status(200).json({ message: 'Usuario excluído com sucesso.' });

        } catch (error: any) {
            res.status(412).json({ message: 'Não foi possível completar a requisição' });
        }
    };
};