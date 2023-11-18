const user1 = {
  user: {
    id: 1,
    username: 'user',
    password: '123',
    role: 'ADMIN',
  },
  meta: {
    id: 1,
    firstname: 'fname',
    lastname: 'lname',
    userId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
}
const user2 = {
  user: {
    id: 2,
    username: 'user2',
    password: '123',
    role: 'USER',
  },
  meta: {
    id: 2,
    firstname: 'fname',
    lastname: 'lname',
    userId: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
}

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('users', [user1.user])
    await queryInterface.bulkInsert('usermeta', [user1.meta])
    await queryInterface.bulkInsert('users', [user2.user])
    await queryInterface.bulkInsert('usermeta', [user2.meta])
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
    await queryInterface.bulkDelete('usersmeta', null, {})
  },
}
