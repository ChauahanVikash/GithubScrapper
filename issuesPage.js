let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');
let path = require('path');

getIssues(1);
function getIssues(issuestab ){

    //let issuesURL = "https://github.com" + issuestab.trim() ;
    let issuesURL = "https://github.com/chromaui/learnstorybook.com/issues";
    //console.log(issuesURL);
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
    let arr  = []
    for(let i = 0 ; i < issuesArray.length ; ++i){
        let issue = searchtool(issuesArray[i]).attr("href").trim();
        arr.push(issue);
    }
    fs.writeFileSync("abc.json" , JSON.stringify(arr));
}
module.exports = {
    getIssues : getIssues
}