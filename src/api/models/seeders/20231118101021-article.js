/* eslint-disable max-len */

const article = {
  data: {
    id: 1,
    title: 'Заголовок ститьи',
    subtitle: 'Подзаголовок',
    img: 'https://backupuusites.hb.bizmrg.com/resize_cache/6096307/d5cb5488396720686a69d0c49ef80752/iblock/d45/d45a96c13aa3585ed2e809753cb0b63d/c8de51edbde3e6b51dad851eab7e45f1.jpg',
    // views: 0,
    // type: [],
    userId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  blocks: [
    {
      id: 1,
      articleId: 1,
      type: 'TEXT',
      content: JSON.stringify('Привет мир'),
    },
    {
      id: 2,
      articleId: 1,
      type: 'CODE',
      content: JSON.stringify('Привет код'),
    },
    {
      id: 3,
      articleId: 1,
      type: 'IMAGE',
      content: JSON.stringify(''),
    },
  ],
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    // await queryInterface.bulkInsert('articles', [article.data])
    // await queryInterface.bulkInsert('article_blocks', [...article.blocks])
  },

  async down(queryInterface, _Sequelize) {
    // await queryInterface.bulkDelete('articles', null, {})
    // await queryInterface.bulkDelete('article_blocks', null, {})
  },
}
