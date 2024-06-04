import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import dotenv from 'dotenv'
import { User } from './User'
import { UserMeta } from './UserMeta'
import { Token } from './Token'
import { FeatureFlags } from './FeatureFlags'
import { UserSettings } from './UserSettings'
import { GameRatings } from './GameRatings'
// import { Article } from './Article'
// import { ArticleBlock } from './ArtricleBlock'
// import { ArticleComment } from './ArticleComment'

dotenv.config()

const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env

const sequelizeOptions: SequelizeOptions = {
    host: POSTGRES_HOST || 'localhost',
    port: +(POSTGRES_PORT || 5432),
    username: POSTGRES_USER || 'postgres',
    password: POSTGRES_PASSWORD || 'newPassword',
    database: POSTGRES_DB || 'gamedev_db',
    models: [User, UserMeta, UserSettings, Token, FeatureFlags, GameRatings],
    dialect: 'postgres',
}

export const sequelize = new Sequelize(sequelizeOptions)

export const initDB = async () => {
    // Форс дропает все таблицы каждый раз при запуске сервера, пока мы вносим много изменений в базы это удобно
    // await sequelize.sync({ force: true })
    await sequelize.sync()

    Token.sync()
    User.sync()
    UserMeta.sync()
    UserSettings.sync()
    FeatureFlags.sync()
    GameRatings.sync()
}
