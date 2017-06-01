var express = require("express"),
    app = express(),
    engines = require("consolidate"),
    MongoClient = require("mongodb").MongoClient
    assert = require("assert");

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views')


MongoClient.connect("mongodb://localhost:27017/video", function(err, db){

    app.get('/movies', function(req, res){
        db.collection('movies')
            .find({})
            .toArray(function(err, docs){
                res.render('movies', {'movies': docs})
            })
    })

    app.get('/params_query/:name', function(req, res){
        var name = req.params.name;
        var queries = req.query;
        var arr = [];
        for( var i in queries ) {
            if (queries.hasOwnProperty(i)){
                arr.push(queries[i]);
            }
        }
        console.log(arr);
        res.render('params_query', {'name': name, 'queries': arr});
    })

    app.get('/', function(req, res){
        res.render('home', {'name': "World!"});
    })

    app.use(function(req, res){
        res.sendStatus(404);
    })

    var server = app.listen(3001, function(){
        var port = server.address().port;
        console.log('Express Server listening on port %s', port);
    })
})