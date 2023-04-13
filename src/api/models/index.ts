import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import dotenv from 'dotenv'
import { UserMeta } from './UserMeta'
import { User } from './User'

dotenv.config()

const {
  POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB,
} = process.env

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST || 'localhost',
  port: +(POSTGRES_PORT || 5432),
  username: POSTGRES_USER || 'postgres',
  password: POSTGRES_PASSWORD || 'newPassword',
  database: POSTGRES_DB || 'gamedev_db',
  models: [User, UserMeta],
  dialect: 'postgres',
}

export const sequelize = new Sequelize(sequelizeOptions)

export const initDB = async () => {
  // Форс дропает все таблицы каждый раз при запуске сервера, пока мы вносим много изменений в базы это удобно
  // await sequelize.sync({ force: true })

  User.sync()
  UserMeta.sync()
  // await sequelize.sync()
}
