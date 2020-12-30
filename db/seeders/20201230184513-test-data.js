'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      "Tweets",
      [
        {
          message: "The Martian was awesome!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          message: "Has anyone seen Ready Player One?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          message:
            "Harry Potter and the Sorcerer's Stone is the best out of all seven HP books :).",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Tweets", null, {});
  }
};
