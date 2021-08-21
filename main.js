let cheerio = require('cheerio')
let request = require('request');
let reposPage = require('./reposPage');

let pageURL = "https://github.com/topics" ;

let dirPath = process.cwd();

request(pageURL , cb);

function cb(err , res , html){
    if(err){
        console.log("Error :" ,err);
    }else if(res.statusCode == 400){
        console.log("PAGE NOT FOUND");
    }else{
        getData(html);
    }
}

function getData(html){
    let serachtool = cheerio.load(html);
    let topicArr = serachtool(".topic-box");
    //console.log(topicArr.length);
    for(let i = 0 ; i < topicArr.length ; ++i){
        let aTag = serachtool(topicArr[i]).find("a");
        let href = aTag.attr("href");
        let topicUrl = pageURL + href.substr(7) ;
        console.log(topicUrl);
        reposPage.repoget(dirPath , topicUrl);
    }
}