module.exports = function(io) {

  var routes = {};
  routes.index = function (req, res) {

    io.sockets.emit('message');
    res.render('index', {
      title: "Awesome page"
    });
  };
  return routes;
};
