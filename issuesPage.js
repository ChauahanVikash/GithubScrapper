let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');
let path = require('path');

// getIssues(1);
// function getIssues(issuestab ){
//     console.log(issuestab);
//     let issuesURL = "https://github.com" + issuestab.trim() ;
//     let issuesURL = "https://github.com/fastlane/fastlane/issues";
//     //console.log(issuesURL);
//     request(issuesURL, cb);
// }

// function cb(err , res, html){
//     if(err){
//         console.log("Error :" ,err);
//     }else if(res.statusCode == 400){
//         console.log("PAGE NOT FOUND");
//     }else{
//         data = readIssues(html);
//         return data ;
//     }
// }


function readIssues(html , topicFolder){
    let searchtool = cheerio.load(html);
    let filename = searchtool(".mr-2.flex-self-stretch").text().trim();
    let issuesArray = searchtool(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    console.log(issuesArray.length);
    let arr  = []
    for(let i = 0 ; i < issuesArray.length ; ++i){
        let issue = searchtool(issuesArray[i]).attr("href").trim();
        arr.push(issue);
    }
    
    console.log(arr);
    let filepath = path.join(topicFolder , filename + ".json")
    console.log(filepath);
    fs.writeFileSync(filepath , JSON.stringify(arr));
    arr = [] 
}
module.exports = {
    readIssues : readIssues
}