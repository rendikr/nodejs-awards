const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
    let Award = sequelize.define(
        'Award',
        {
            code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.ENUM('vouchers', 'products', 'giftcard'),
                allowNull: true,
                default: null,
            },
            point: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null,
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            freezeTableName: true,
            tableName: 'awards',
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['code'],
                },
            ],
        }
    );

    sequelizePaginate.paginate(Award);

    return Award;
};
