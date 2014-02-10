var st = require('node-static');
module.exports = function (done) {

//
// Create a node-static server instance to serve the './public' folder
//
    var file = new st.Server(__dirname + '/public');

     var server = require('http').createServer(function (request, response) {
        console.log('started server...');
        request.addListener('end',function () {
            //
            // Serve files!
            //
            console.log('serving file...%s', request.url);

            file.serve(request, response);
        }).resume();
    }).listen(8080);
    done(server);
};

if (process.argv[2] == 'run'){
    module.exports(function(){
       console.log('running');
    })
}