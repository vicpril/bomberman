import { Table, Model, Column, PrimaryKey, ForeignKey, BelongsTo, BeforeSync } from 'sequelize-typescript'
import { Sequelize } from 'sequelize'
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

    @Column({ defaultValue: false })
    isArticleRatingEnabled: boolean

    @Column({ defaultValue: false })
    isCounterEnabled: boolean

    @BeforeSync
    static async bulcFeatureFlagsForAllUsers() {
        const lonelyUsers = await User.findAll({
            attributes: ['id'],
            include: [{ model: FeatureFlags, required: false, attributes: [], as: 'features' }],
            where: [Sequelize.where(Sequelize.col('features.userId'), null)],
        }).then((res) => res.map((u) => ({ userId: u.id })))
        await FeatureFlags.bulkCreate(lonelyUsers)
    }
}
