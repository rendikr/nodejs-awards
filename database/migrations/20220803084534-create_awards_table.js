'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('awards', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            code: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            type: {
                type: Sequelize.ENUM('vouchers', 'products', 'giftcard'),
                allowNull: true,
                default: null,
            },
            point: {
                type: Sequelize.INTEGER,
                allowNull: false,
                default: 0,
            },
            image: {
                type: Sequelize.STRING,
                allowNull: true,
                default: null,
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('NOW()'),
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('NOW()'),
            },
            deleted_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: null,
            },
        }, {
          uniqueKeys: {
              actions_unique: {
                  fields: ['code']
              }
          }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('awards');
    },
};
