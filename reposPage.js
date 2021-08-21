const  cheerio  = require("cheerio");
const fs = require('fs');
const path = require('path');
const request = require("request");
let issuesPage = require('./issuesPage'); 


let mainfolder ;
function repoget(dirPath , topicUrl){
    mainfolder = path.join(dirPath , "Topics");
    makedir(mainfolder);
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
    //console.log(topicName.length);
    let topicFolder = path.join(mainfolder , topicName);
    makedir(topicFolder);
    console.log(topicName);
    console.log(topicFolder);
    let repos = searchtool(".border.rounded.color-shadow-small.color-bg-secondary.my-4");
    for(let i = 0 ; i < 8 ; ++i){
        let navAnchors = searchtool(repos[i]).find("div nav a");
        //let a = searchtool(issuestab)
        let issuestab = searchtool(navAnchors[1]).attr("href").trim();
        issuesPage.getIssues(issuestab , topicFolder);
        //console.log("......................................");
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
