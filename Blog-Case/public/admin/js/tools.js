//处理获得表单提交值的方法
function serializeToJson(form) {
    var obj = {}
    //获取到表单中用户输入的内容,返回一个存储对象的数组，对象个数就是表单里提交的内容，对象里有两个属性：name、value
    //name的值就是表单里的name值，value的值就是用户在当前name表单里输入的值
    var res = form.serializeArray()
    res.forEach(function (item) {
        obj[item.name] = item.value
    })
    return (obj)
}