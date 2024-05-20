import { sequelize } from '@api/models'
import { Transaction } from 'sequelize'

export interface TransactionServiceOptions {
    transaction?: Transaction
}

export const TransactionService = async <T extends (t: Transaction) => Promise<any>>(
    callback: T,
    options?: TransactionServiceOptions,
): Promise<ReturnType<T>> => {
    const t = options?.transaction ?? (await sequelize.transaction())

    try {
        const result = await callback(t)

        if (!options?.transaction) {
            t.commit()
        }

        return result
    } catch (error) {
        if (!options?.transaction) {
            t.rollback()
        }
        throw error
    }
}
