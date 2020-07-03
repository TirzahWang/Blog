const formidable = require('formidable')
const path = require('path')
const { Article } = require('../../model/article')
module.exports = (req, res) => {
    //创建表单解析对象
    const form = new formidable.IncomingForm()
    //配置上传文件的存放位置(绝对路径)
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads')
    //保留表单上传文件的扩展名
    form.keepExtensions = true
    //解析表单
    form.parse(req, async (err, fields, files) => {
        // res.send(files.cover.path.split('public')[1])
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content,
        })
        res.redirect('/admin/article')
    })
}