const mongoose = require('mongoose')

const Article = mongoose.model('Article', new mongoose.Schema({
    title: {
        type: String,
        required: [true, '请填写文章标题'],
        minlength: 4,
        maxlength: 20
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请输入作者']
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String,
        minlength: 15
    }
}))
module.exports = {
    Article
}