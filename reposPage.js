const  cheerio  = require("cheerio");
const fs = require('fs');
const path = require('path');
const request = require("request");
let issuesPage = require('./issuesPage'); 

function repoget(dirPath , topicUrl){
    //mainfolder = path.join(dirPath , "Topics");
    //makedir(mainfolder);
    console.log(topicUrl);
    request(topicUrl , cb);
}

function cb(err , res , html){
    if(err){
        console.log("Error :" ,err);
    }else if(res.statusCode == 400){
        console.log("PAGE NOT FOUND");
    }else{
        getRepo(html);
    }
}
function getRepo(html){
    let searchtool = cheerio.load(html);
    let topicName = searchtool(".h1").text().trim();
    let topicFolder = path.join(__dirname , topicName);
    makedir(topicFolder);
    //console.log(topicName);
    //console.log(topicFolder);
    let repos = searchtool(".border.rounded.color-shadow-small.color-bg-secondary.my-4");
    let n = repos.length;
    for(let i = 0 , j = 0  ; i < 8 && j < n ; ++i , ++j){
        let navAnchors = searchtool(repos[i]).find("div nav a");
        //let a = searchtool(issuestab)
        let issuestab = searchtool(navAnchors[1]).attr("href").trim();
        //issuesPage.getIssues(issuestab);
        // let arr = issuestab.split("/");
        // let filename = arr[1] + ".json";
        // let filepath = path.join(topicFolder , filename);
        //console.log(filename);
        //console.log(issuestab);
        //console.log(issuestab.length);
    }
    

}

function makedir(dirPath){
    if(fs.existsSync(dirPath) == false){
        fs.mkdirSync(dirPath);
    }
}

module.exports = { 
    repoget : repoget
}
