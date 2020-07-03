const { Article } = require('../../model/article')
module.exports = async (req, res) => {
    let { id } = req.query
    let article = await Article.findOne({ _id: id }).populate('author')
    //res.send(article)
    res.render('home/article', { article })
}