var st = require('node-static');
//
// Create a node-static server instance to serve the './public' folder
//

module.exports = function(done){
    var file = new st.Server(__dirname + '/public');
    require('http').createServer(function (request, response) {
        request.addListener('end',function () {
            //
            // Serve files!
            //

            file.serve(request, response);
        }).resume();
    }).listen(8123);
    done();
};
