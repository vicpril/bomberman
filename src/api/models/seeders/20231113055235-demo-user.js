const getUser1 = (Sequelize) => ({
  user: {
    id: 1,
    username: 'admin',
    password: '123',
    roles: Sequelize.literal('ARRAY[\'ADMIN\', \'USER\']::"enum_users_roles"[]'),
  },
  meta: {
    id: 1,
    firstname: 'admin',
    lastname: 'admin',
    userId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
})
const getUser2 = (Sequelize) => ({
  user: {
    id: 2,
    username: 'manager',
    password: '123',
    roles: Sequelize.literal('ARRAY[\'MANAGER\', \'USER\']::"enum_users_roles"[]'),
  },
  meta: {
    id: 2,
    firstname: 'manager',
    lastname: 'manager',
    userId: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
})
const getUser3 = (Sequelize) => ({
  user: {
    id: 3,
    username: 'user',
    password: '123',
    roles: Sequelize.literal('ARRAY[\'USER\']::"enum_users_roles"[]'),
  },
  meta: {
    id: 3,
    firstname: 'user',
    lastname: 'user',
    userId: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
})

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    const user1 = getUser1(Sequelize)
    await queryInterface.bulkInsert('users', [user1.user])
    await queryInterface.bulkInsert('usermeta', [user1.meta])
    const user2 = getUser2(Sequelize)
    await queryInterface.bulkInsert('users', [user2.user])
    await queryInterface.bulkInsert('usermeta', [user2.meta])
    const user3 = getUser3(Sequelize)
    await queryInterface.bulkInsert('users', [user3.user])
    await queryInterface.bulkInsert('usermeta', [user3.meta])
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
    await queryInterface.bulkDelete('usersmeta', null, {})
  },
}
