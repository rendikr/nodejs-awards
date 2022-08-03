'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'awards',
      [
        {
          code: 'AWRD-VC-01',
          name: 'Gift Card IDR 1.000.000',
          type: 'vouchers',
          point: 500000,
          image: null,
          is_active: true,
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: 'AWRD-VC-02',
          name: 'Gift Card IDR 500.000',
          type: 'vouchers',
          point: 250000,
          image: null,
          is_active: true,
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: 'AWRD-PR-01',
          name: 'Old Fashion Cake',
          type: 'products',
          point: 100000,
          image: null,
          is_active: true,
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: 'AWRD-VC-03',
          name: 'Gift Card IDR 100.000',
          type: 'vouchers',
          point: 50000,
          image: null,
          is_active: true,
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: 'AWRD-VC-04',
          name: 'Gift Card IDR 250.000',
          type: 'vouchers',
          point: 100000,
          image: null,
          is_active: true,
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: 'AWRD-PR-02',
          name: 'Citayam Fashion Cake',
          type: 'products',
          point: 120000,
          image: null,
          is_active: true,
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: 'AWRD-GC-01',
          name: 'Limited Gift Card IDR 500.000',
          type: 'giftcard',
          point: 300000,
          image: null,
          is_active: true,
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: 'AWRD-GC-02',
          name: 'Limited Gift Card IDR 200.000',
          type: 'giftcard',
          point: 100000,
          image: null,
          is_active: true,
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('awards', null, {});
  },
};
