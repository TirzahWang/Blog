//引入bcrypt
const bcrypt = require('bcrypt')
const formidable = require('formidable')
const path = require('path')
//引入数据集合
const { Article } = require('../../model/article')
module.exports = async (req, res, next) => {
    //创建表单解析对象
    const form = new formidable.IncomingForm()
    //配置上传文件的存放位置(绝对路径)
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads')
    //保留表单上传文件的扩展名
    form.keepExtensions = true
    //解析表单
    form.parse(req, async (err, fields, files) => {
        const { id } = req.query
        let article = await Article.findOne({ _id: id }).populate('author')
        //原作者的加密密码
        let { password } = article.author
        //比对密码
        let isValid = await bcrypt.compare(fields.password, password)
        if (isValid) {
            //密码比对成功
            await Article.updateOne({ _id: id }, {
                title: fields.title,
                publishDate: fields.publishDate,
                cover: files.cover.path.split('public')[1],
                content: fields.content
            })
            res.redirect('/admin/article')
        } else {
            //密码比对失败
            let obj = JSON.stringify({ path: '/admin/article-edit', message: '密码比对失败，不能进行用户信息修改&id=' + id })
            next(obj)
        }
    })

}