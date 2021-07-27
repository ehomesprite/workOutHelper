/**
 * created by zhangzihao on {2021/7/27}
 */
const {getDB} = require('../db');
const items = [{
    cost: 10,
    desc: 'test - 1234 1234 1234',
    stock: null,
    name: 'test',
},{
    cost: 10,
    desc: 'test - 1234 1234 1234',
    stock: null,
    name: 'test',
},{
    cost: 10,
    desc: 'test - 1234 1234 1234',
    stock: null,
    name: 'test',
}];

const setShop = async () => {
    const db = await getDB('ShopItem');
    await db.deleteMany({});
    await db.insertMany(items);
};

setShop();