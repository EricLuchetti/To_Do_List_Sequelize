import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db";
import { Tarefa } from "./Tarefa";
import bcrypt from 'bcrypt';

export class Usuario extends Model {
    public cod_usuario?: number;
    public login?: string;
    public email?: string;
    public senha?: string;
    public token?: string;
    public cod_recuperacao?: string;
    public cod_recuperacao_expiracao?: Date;
    public readonly datCadastro?: Date;
    public readonly datAtualizacao?: Date;
}

export interface Usuario {
    cod_usuario?: number;
    login?: string;
    email?: string;
    senha?: string;
    token?: string;
    cod_recuperacao?: string;
    cod_recuperacao_expiracao?: Date;
}

Usuario.init({
    cod_usuario: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    login: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: 'usuarioUniqueIndex'
    },
    senha: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    cod_recuperacao: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    cod_recuperacao_expiracao: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'usuarios',
    sequelize: sequelize,
    updatedAt: 'dat_atualizacao',
    createdAt: 'dat_cadastro',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeCreate: (data) => {
            if (data.senha) {
                data.senha = criptografarSenha(data.senha);
            }
        },
        beforeUpdate: (data) => {
            if (data.senha) {
                data.senha = criptografarSenha(data.senha);
            }
        },
    }
});

Usuario.sync({ force: false }).then(() => {
    console.log(`Tabela 'Usuario' criada com sucesso!`);
});

function criptografarSenha(senha: string) {
    return bcrypt.hashSync(senha.toString(), 10);
}