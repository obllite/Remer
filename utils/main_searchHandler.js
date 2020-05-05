const cheerio = require("cheerio");
const request = require("request");
//FUNCTION scrapy 部分
//PARAMS httpQue 为 http url 队列，考虑传入配置interface来进行http配置
//TODO 添加请求错误处理（特别是超时，因为多数国外网站需要梯子）
function searchWord(word, httpQue) {
    //console.log(innerContent)
    let httpURL = '';
    console.log('http is ', httpQue[0]);
    console.log('word is ', word);
    httpURL = httpQue[0].concat(word);
    console.log('httpURL is ', httpURL);
    return new Promise((resolve, reject) => {
        request.get(httpURL, (err, res, data) => {
            resolve(getContent(data))
        })
    })
}
function getContent(data) {
    let $ = cheerio.load(data);
    let innerContent = $(".content.definitions.cobuild.br").html()
    return innerContent
}

exports.searchWord = searchWord