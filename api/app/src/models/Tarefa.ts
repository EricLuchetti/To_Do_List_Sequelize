import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db";
import { Usuario } from "./Usuario";

export class Tarefa extends Model {
    public cod_tarefa?: bigint;
    public tarefa?: string;
    public horario?: string;
    public prioridade?: boolean;
    public concluida?: boolean;
    public readonly datCadastro?: Date;
    public readonly datAtualizacao?: Date;
}

export interface Tarefa {
    cod_tarefa?: bigint;
    tarefa?: string;
    horario?: string;
    prioridade?: boolean;
    concluida?: boolean;
}

Tarefa.init({
    cod_tarefa: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    cod_usuario: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    tarefa: {
        type: DataTypes.STRING(85),
        allowNull: false
    },
    horario: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    prioridade: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    concluida: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    tableName: 'tarefas',
    sequelize: sequelize,
    updatedAt: 'dat_atualizacao',
    createdAt: 'dat_cadastro',
    freezeTableName: true,
    timestamps: true
});

Tarefa.sync({ force: false }).then(() => {
    Tarefa.belongsTo(Usuario, {
        foreignKey: 'cod_usuario',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

    console.log(`Tabela 'Tarefa' criada com sucesso!`);
});