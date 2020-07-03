const mongoose = require('mongoose')
//导入config模块
const config = require('config')
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, {
    useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:
        true
})
    .then(() => {
        console.log('数据库已连接')
    })