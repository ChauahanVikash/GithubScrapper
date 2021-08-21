const  cheerio  = require("cheerio");
const fs = require('fs');
const path = require('path');
const request = require("request");
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
    let topicName = searchtool(".h1");
    //console.log(topicName.length);
    let topicFolder = path.join(mainfolder , topicName);
    makekdir(topicFolder);
    
}

function makedir(dirPath){
    if(fs.existsSync(dirPath) == false){
        fs.mkdirSync(dirPath);
    }
}

module.exports = { 
    repoget : repoget
}