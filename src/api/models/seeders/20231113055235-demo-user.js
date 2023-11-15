/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        username: 'user',
        password: '123',
      },
    ])
    await queryInterface.bulkInsert('usermeta', [
      {
        id: 1,
        firstname: 'fname',
        lastname: 'lname',
        user_id: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ])
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
    await queryInterface.bulkDelete('usersmeta', null, {})
  },
}
