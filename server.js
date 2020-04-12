var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('新的请求！路径（带查询参数）为：' + pathWithQuery)

    if (path === '/') {
        let string = fs.readFileSync('./index.html', 'utf8')
        let amount = fs.readFileSync('./db', 'utf8') // 100
        string = string.replace('&&&amount&&&', amount)
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(string)
        response.end()
    } else if (path === '/style.css') {
        let string = fs.readFileSync('./style.css', 'utf8')
        response.setHeader('Content-Type', 'text/css')
        response.write(string)
        response.end()
    } else if (path === '/main.js') {
        let string = fs.readFileSync('./main.js', 'utf8')
        response.setHeader('Content-Type', 'application/javascript')
        response.write(string)
        response.end()
    }else if (path === '/pay') {
        /* 读取当前数据文件的金额 */
        let amount = fs.readFileSync('./db', 'utf8') // 100
        /* 将金额减一 */
        let newAmount = amount - 1
        /* 随机成功失败的概率 */
        if(Math.random()>0.5) {
            /* 修改数据文件中的金额为减一后的金额 */
            fs.writeFileSync('./db', newAmount)
            response.setHeader('Content-Type', 'image/jpg')
            /* 提示修改成功 */
            response.statusCode = 200
            response.write(fs.readFileSync('./photo.jpg'))
        }else {
            /* 提示修改失败 */
            response.statusCode = 400
            response.write('fail')
        }
        response.end()
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`你输入的路径不存在对应的内容`)
        response.end()
    }

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)


