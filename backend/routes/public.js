'use strict'

const Router = require('koa-router')
const controllers = require('../controllers')
const faker = require('faker')
faker.locale = "zh_CN"; // 设置为中文

const router = new Router()
router.prefix('/api')

router.get('/', async (ctx, next) => {
    // 返回给客户端的数据
    ctx.body = {
        code: 200,
        message: 'hello world'
    }
})

router.get('/big-data-count', async (ctx, next) => {
    // 返回给客户端的数据
    ctx.body = {
        data: 100
    }
})

router.get('/big-data-page', async (ctx, next) => {
    const pageSize = parseInt(ctx.query.pageSize) || 10;
    const levels = ['初级', '中级', '高级', '资深', '专家', '首席'];
    const positions = ['助理', '专员', '主管', '经理', '总监', '副总裁'];
    const roles = ['开发工程师', '产品经理', 'UI设计师', '销售代表', '人力资源专员', '财务专员', '市场专员', '技术支持工程师']
    const departments = ['人力资源部', '财务部', '市场部', '技术部', '产品部', '运营部', '行政部'];

    const data = Array.from({ length: pageSize }, (_, i) => ({ 
        id: faker.datatype.uuid(),
        name: faker.name.firstName() + faker.name.lastName(),
        gender: faker.helpers.randomize(['男', '女']),
        role: faker.helpers.randomize(roles),
        department: faker.helpers.randomize(departments),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        createdAt: faker.date.recent().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        level: faker.helpers.randomize(levels),
        position: faker.helpers.randomize(positions),
        salary: faker.datatype.number({ min: 5000, max: 20000 }),
        status: faker.helpers.randomize(['在职', '离职', '待入职']),
        department: faker.company.companyName(),
        birthDate: faker.date.between(new Date(1990, 0, 1), new Date(2010, 11, 31)).toLocaleDateString(),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        country: faker.address.country(),
        zipCode: faker.address.zipCode(),
        children: faker.datatype.number({ min: 0, max: 2 }),
        spouse: faker.datatype.boolean(), // 配偶
     }));
     ctx.body = data
})


module.exports = router
