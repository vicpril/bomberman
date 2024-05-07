import { Model } from 'sequelize-typescript'

export interface BaseRESTService<T extends Model> {
    getById?: (...args: any[]) => Promise<T | null>

    get?: (...args: any[]) => Promise<T[]>

    create?: (...args: any[]) => Promise<T>

    update?: (...args: any[]) => Promise<T>

    delete?: (...args: any[]) => Promise<number>
}
