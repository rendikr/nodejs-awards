require('dotenv').config();

let { Award, User } = require(`${__base}/models`);

let Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
let httpStatus = require('http-status');
let response = require('../../helpers/response');
let Sequelize = require('sequelize');
let config = loadConfig('/config');

exports.all = async (req, res) => {
    try {
        let condition = { is_deleted: false };
        let order = 'DESC';
        let limit = 5;
        let page = 1;
        let orderSort = ['createdAt', 'DESC'];

        if (req.query.order) order = req.query.order;
        if (req.query.page) page = parseInt(req.query.page);
        if (req.query.limit) limit = parseInt(req.query.limit);
        if (req.query.is_deleted)
            condition['is_deleted'] = req.query.is_deleted === 'true';

        if (req.query.sort) {
            if (req.query.sort.includes('.')) {
                orderSort = [];
                const sortInput = req.query.sort.split('.');
                sortInput.forEach((si) => {
                    orderSort.push(si);
                });
                orderSort.push(order);
            } else {
                orderSort = [req.query.sort, order];
            }
        }

        if (req.query.keyword) {
            var conditionOr = [];
            conditionOr.push({
                name: Sequelize.literal(
                    'lower("name") like lower(\'%' + req.query.keyword + "%')"
                ),
            });

            condition[Sequelize.Op.or] = conditionOr;
        }

        if (req.query.type) {
            var conditionOr = [];

            const typeFiltered = decodeURIComponent(req.query.type);
            if (typeFiltered.includes(',')) {
                typeInput = [];
                const typeSplit = typeFiltered.split(',');
                typeSplit.forEach(ts => {
                    typeInput.push(`'${ts}'`)
                });

                conditionOr.push({
                    'type': Sequelize.literal('"Award"."type" in ('+typeInput+')')
                });
                condition[Sequelize.Op.or] = conditionOr;
            } else {
                conditionOr.push({
                    'type': Sequelize.literal('"Award"."type" = \''+typeFiltered+'\'')
                });
                condition[Sequelize.Op.or] = conditionOr;
            }
        }

        if (req.query.point_start && !isNaN(req.query.point_start) && req.query.point_end && !isNaN(req.query.point_end)) {
            var start = parseInt(req.query.point_start);
            var end = parseInt(req.query.point_end);

            if (start > 0 && end > 0 && start < end)  {
                condition['point'] = {
                    $between: [start, end],
                };
            }
        } else if (req.query.point_start && !isNaN(req.query.point_start)) {
            var start = parseInt(req.query.point_start);

            if (start > 0)
                condition['point'] = { $gte: start };
        } else if (req.query.point_end && !isNaN(req.query.point_end)) {
            var end = parseInt(req.query.point_end);

            if (end > 0)
                condition['point'] = { $lte: end };
        }

        const options = {
            offset: (page - 1) * limit,
            limit: limit,
            where: condition,
            order: [orderSort],
        };

        let data = await Award.findAll(Object.assign({}, options));

        let total = await Award.count(
            Object.assign({ distinct: true }, options)
        );

        const pages = Math.ceil(total / limit);

        let next_page = '#';
        let prev_page = '#';
        let has_next_page = false;
        let has_prev_page = false;
        if (pages > 1 && page < pages) {
            next_page = `/customer/awards?token=${req.query.token}&page=${
                page + 1
            }`;
            has_next_page = true;
        }
        if (pages > 1 && page > 1) {
            prev_page = `/customer/awards?token=${req.query.token}&page=${
                page - 1
            }`;
            has_prev_page = true;
        }

        res.render('customer/award', {
            title: 'Awards',
            author: 'Rendi K.',
            data,
            total,
            pages,
            limit,
            next_page,
            prev_page,
            has_next_page,
            has_prev_page,
            filter: req.query
        });
    } catch (err) {
        console.error(err);
        return response.responseJSON(
            req,
            res,
            httpStatus.UNPROCESSABLE_ENTITY,
            false,
            err
        );
    }
};
