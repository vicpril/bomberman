import { Table, Model, Column, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { User } from './User'

@Table({
    tableName: 'feature-flags',
    timestamps: false,
    defaultScope: {
        attributes: {
            exclude: ['userId'],
        },
    },
})
export class FeatureFlags extends Model {
    @PrimaryKey
    @ForeignKey(() => User)
    @Column
    userId!: number

    @BelongsTo(() => User, 'userId')
    user!: Awaited<User>

    @Column({ defaultValue: true })
    isArticleRatingEnabled: boolean

    @Column({ defaultValue: false })
    isCounterEnabled: boolean

    // @BeforeSync
    // static async bulcFeatureFlagsForAllUsers({ transaction }: { transaction: Transaction }) {
    //     const lonelyUsers = await User.findAll({
    //         attributes: ['id'],
    //         include: [{ model: FeatureFlags, required: false, attributes: [], as: 'features' }],
    //         where: [Sequelize.where(Sequelize.col('features.userId'), null)],
    //         transaction,
    //     }).then((res) => res.map((u) => ({ userId: u.id })))
    //     await FeatureFlags.bulkCreate(lonelyUsers)
    // }
}
