const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

//引入joi模块
const joi = require('joi')

const User = mongoose.model('User', new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    //admin超级管理员  normal普通用户
    role: {
        type: String,
        required: true
    },
    //0启用状态，1禁用状态
    state: {
        type: Number,
        default: 0
    }
}))

async function createUser() {
    const salt = await bcrypt.genSalt(10)
    const pass = await bcrypt.hash('123456', salt)
    const user = await User.create({
        username: 'zhangzhang',
        email: '498220@qq.com',
        password: pass,
        role: 'admin',
        state: 0
    })
}

//验证用户信息
const validateUser = async (user) => {
    const schema = {
        //定义验证规则
        username: joi.string().min(2).max(12).required().error(new Error('用户名不符合规则')),
        email: joi.string().email().required().error(new Error('邮箱不符合规则')),
        password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码不符合规则')),
        role: joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
        state: joi.number().valid(0, 1).required().error(new Error('状态值值非法')),
    }
    return joi.validate(user, schema)
}
module.exports = {
    User,
    validateUser
}