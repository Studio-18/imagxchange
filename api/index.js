var express 		= require( 'express' ),
	app				= express(),
	port 			= process.env.PORT || 8080,
	bodyParser		= require( 'body-parser'),
	morgan			= require( 'morgan' ),
	mongoose 		= require( 'mongoose' ),
	userapiRouter	= require( './routes/userRoutes' ),
	photoapiRouter	= require( './routes/photoRoutes' ),
	cors			= require( 'cors' ),
	path			= require( 'path');



mongoose.connect( process.env.MONGOLAB_URI || 'mongodb://localhost:27017/imagxchange')

//links the server to the client static pages
app.use(express.static(__dirname + '/client'))

//sets up middleware
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use(morgan( 'dev' ))

app.use('/api/users', userapiRouter) //sends any get request with api prefix to the api router
app.use('/api/photos', photoapiRouter)

app.get('*', function( req, res ){
	res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.listen(port)
console.log("listening on port" + port)


//socket io app.get function
app.get('/', function(req, res){
	res.sendfile('index.html');
});


//setting up server side websocket for twitter
// io.on('connection', function(socket) {
// 	console.log('logon attempt')
// 	socket.on('tweet', function(tweet) {
// 		socket.emit('tweets', tweet);

// 	var stream = twitter.stream('statuses/filter', { track: 'george clooney' });
	
<<<<<<< HEAD
	//tiddy up tweet data
	stream.on('tweet', function (tweet) {
		console.log("magic tweets");
		var data = {};
			data.name = tweet.user.name;
			data.screen_name = tweet.user.screen_name;
			data.text = tweet.text;
			data.user_profile_image = tweet.user.profile_image_url;
			socket.emit('tweets', data);
			// setTimeout(function) {
			// 	socket.disconnect("Die")
			// }, 3000);
	
	});
  });
});
=======
// 	//tiddy up tweet data
// 	stream.on('tweet', function (tweet) {
// 		var data = {};
// 			data.name = tweet.user.name;
// 			data.screen_name = tweet.user.screen_name;
// 			data.text = tweet.text;
// 			data.user_profile_image = tweet.user.profile_image_url;
// 			socket.emit('tweets', data);
// 			// setTimeout(function) {
// 			// 	socket.disconnect("Die")
// 			// }, 3000);
// 	console.log(data)
// 	});
//   });
// });
>>>>>>> upstream/master

module.exports = app;
