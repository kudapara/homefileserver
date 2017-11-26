var express = require('express');
var bodyParser = require('body-parser');
var expressFileUpload = require('express-fileupload');
//var fileDownloader = require('file-downloader');

var app = express();
app.use('/',express.static(__dirname+'/public'))
app.listen(3000)
//'127.34.12.3 tawanda
app.use(expressFileUpload());
console.log('Listening');

app.get('/', function(req,res) {
    res.sendFile(__dirname+"/index.html");
});

app.get('/upload', function(req,res){
    res.sendFile(__dirname+'/upload.html');
})

app.get('/download',function(req,res){
    res.sendFile(__dirname+'/download.html')
})

app.post('/upload',function(req,res){
    if(req.files){
        var nameOfFile;
        var file = req.files.filename;
        if(file==undefined){
            res.redirect(req.get('referer'))
        }
        else if(file.length==undefined){
            nameOfFile = file.name;
            file.mv("./Uploaded/"+nameOfFile,function(err){
                 if(err){
                     console.log(err);
                     res.send("An error occured")
                 }
                 else{
                    res.send("Done Upload Complete")  
                 }
             })
        }
        else {for(var i = 0; i< file.length; i++)
        {
           nameOfFile = file[i].name;
           file[i].mv("./Uploaded/"+nameOfFile,function(err){
                if(err){
                    console.log(err);
                    res.send("An error occured")
                }
            })
        }
        res.send("Done Upload Complete")
    }
    }
})