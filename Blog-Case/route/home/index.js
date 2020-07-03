const { Article } = require('../../model/article')
//导入分页模块
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
    let { page } = req.query
    let articles = await pagination(Article).find().populate('author').page(page).size(4).display(5).exec()
    res.render('home/default.art', { articles })
    //res.send(articles)
} 