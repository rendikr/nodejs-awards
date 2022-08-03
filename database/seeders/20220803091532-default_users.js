'use strict';
let bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Superadmin',
          email: 'admin@member.id',
          password: bcrypt.hashSync('secret', 10),
          is_active: true,
          is_verified: true,
          is_admin: true,
          is_deleted: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Member',
          email: 'member@member.id',
          password: bcrypt.hashSync('secret', 10),
          is_active: true,
          is_verified: true,
          is_admin: false,
          is_deleted: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
