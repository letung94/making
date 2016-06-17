var express = require('express');
var app = express();
var path = require('path');

var bodyParser = require('body-parser');
app.use(bodyParser.json({
    limit: '6mb'
}));
app.use(bodyParser.urlencoded({
    limit: '6mb',
    extended: true
}));


app.use(express.static(path.join(__dirname, '../app')));

var jsonfile = require('jsonfile')

var file = 'app/data/image.json';
var rootimgpath = 'app/data/images/';
var getimagpath = "data/images/";

function writeFile(data) {
    function decodeBase64Image(image) {
        var data = image.replace(/^data:image\/\w+;base64,/, '');
        return new Buffer(data, 'base64');
    }

    function makestringrandom() {
        var uuid = require('node-uuid');
        var text = uuid.v1();
        return text;
    }
    var endstring = makestringrandom() + data.tenhinh;
    var url = rootimgpath + endstring;
    var urlimg = getimagpath + endstring;
    var imageBuffer = decodeBase64Image(data.content);
    var fs = require('fs');

    fs.writeFileSync(url, imageBuffer, {
        encoding: 'base64'
    }, function(err) {
        console.log(err);
    });
    return urlimg;
}


app.post('/save', function(req, res) {
    var url = writeFile(req.body);
    req.body.content = url;
    jsonfile.readFile(file, function(err, obj) {
        if (obj == null || obj == undefined) {
            var arr = [req.body]
            jsonfile.writeFileSync(file, arr);
            res.sendStatus(200);
        } else {
            obj.push(req.body);
            jsonfile.writeFileSync(file, obj);
            res.sendStatus(200);
        }

    });

});

app.get('/getdata/:page/:count', function(req, res) {
    var page = parseInt(req.params.page);
    var count = parseInt(req.params.count);
    jsonfile.readFile(file, function(err, obj) {
        if (obj == null || obj == undefined) {
            res.json({
                data: null,
                total: total
            })
        } else {
            var total = obj.length;
            var resdata = obj.slice((page - 1) * count, count * page);
            res.json({
                data: resdata,
                total: total
            })
        }

    });




});


app.listen(3000, function() {
    console.log('port: ' + 3000);
});