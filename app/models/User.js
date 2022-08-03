const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define(
        'User',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            point: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            is_verified: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            is_admin: {
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
            tableName: 'users',
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['email'],
                },
            ],
        }
    );

    User.prototype.toJSON = function () {
        var values = Object.assign({}, this.get());

        delete values.password;
        return values;
    };

    sequelizePaginate.paginate(User);

    return User;
};
