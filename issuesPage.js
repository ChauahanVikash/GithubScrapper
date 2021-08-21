let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');
let path = require('path');

function getIssues(issuestab , topicFolder){
    let arr = issuestab.split("/");
    let filename = arr[1] + ".json";
    let filepath = path.join(topicFolder , filename) ;

    let issuesURL = "https://github.com" + issuestab.trim() ;
    if(fs.existsSync(filepath) == false){
        fs.writeFileSync(filepath , "") ;
    }
    console.log(issuesURL);
    request(issuesURL, cb);
}

function cb(err , res, html){
    if(err){
        console.log("Error :" ,err);
    }else if(res.statusCode == 400){
        console.log("PAGE NOT FOUND");
    }else{
        readIssues(html);
    }
}

function readIssues(html){
    let searchtool = cheerio.load(html);
    let issuesArray = searchtool(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    console.log(issuesArray.length);
    for(let i = 0 ; i < issuesArray.length ; ++i){
        let issues = searchtool(issuesArray[0]).attr("href").trim();
        console.log(issues);
    }

}
module.exports = {
    getIssues : getIssues
}