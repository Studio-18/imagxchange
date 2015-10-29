angular
	.module('imagXchange')
	.controller('PhotosController', PhotosController);
//inject the $http
PhotosController.$inject = [ '$state', '$http' ]
//PhotosController.$inject = [ 'photosFactory' ]
//vm.photo = {}
var photo = {}

//refer to the photo module
function PhotosController( $state, $http ){
	console.log("PhotosController is loading")
	console.log( "1", photo )
	
	var vm = this
	vm.photos = []
	vm.photo = photo
	vm.$http = $http
	console.log("this is global photo", photo )
	

                function InitChart() {
                	 // console.log("faaaad")
                    var data = [{
                        "position": "0",
                        "price": "5"
                    }, {
                        "position": "1",
                        "price": "6"
                    }, {
                        "position": "2",
                        "price": "7"
                    }, {
                        "position": "3",
                        "price": "10"
                    }, {
                        "position": "5",
                        "price": "9"
                    }, {
                        "position": "8",
                        "price": "10"
                    }];

                    // console.log("Initichat:", data)
                    
                    var vis = d3.select("#visualisation"),
                        WIDTH = 1000,
                        HEIGHT = 500,
                        MARGINS = {
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 50
                        },
                        xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0, 10]),
                        yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, 10]),
                        xAxis = d3.svg.axis()
                        .scale(xScale),
                        yAxis = d3.svg.axis()
                        .scale(yScale)
                        .orient("left");
                    
                    // console.log("vis:", vis)

                    vis.append("svg:g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
                        .call(xAxis);
                    vis.append("svg:g")
                        .attr("class", "y axis")
                        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
                        .call(yAxis);
                    var lineGen = d3.svg.line()
                        .x(function(d) {
                            return xScale(d.position);
                        })
                        .y(function(d) {
                            return yScale(d.price);
                        })
                        .interpolate("basis");
                    vis.append('svg:path')
                        .attr('d', lineGen(data))
                        .attr('stroke', 'green')
                        .attr('stroke-width', 2)
                        .attr('fill', 'none'); 
                }
                InitChart();	
}

//gets all photos 
PhotosController.prototype.photosIndex = function() {
	console.log("PhotoIndex is running")
	var vm = this
	vm.all = []
	console.log("this is vm.all", vm.all)
	console.log("this is vm.photo", vm.photo)

	vm.$http
		.get( "http://localhost:8080/api/photos" )
		.then( response => {
			vm.all = response.data
			console.log("this is all after the index:", vm.all)
			console.log("this is vm aftre the inxe:", vm.photo)
	})

}

PhotosController.prototype.photosShow = function(id) {
	console.log("Working")

	var vm 			= this
 		// vm.photo 	= {}


	console.log("viewphotos function is running " + id)

	vm.$http
		.get( "http://localhost:8080/api/photos/" + id )

		.then( response => {

		vm.photo = response.data

		console.log("this is vm.photo after photoshow has run:", vm.photo)

		window.location.href = "#/photos/" + response.data._id

		photo = vm.photo

		console.log( "vm after window loads:", vm.photo)



		})

}

PhotosController.prototype.buyPhoto = function(id) {
	console.log("buy button is hitting")

	var vm = this
	vm.photo = {}
	console.log("vm.photo", vm.photo)

	console.log(vm.photo)

	if (vm.photo.currentprice >= vm.photo.startingprice){

		var newprice = (vm.photo.currentprice + 1)
		vm.photo.currentprice = newprice
		console.log(newprice)	
		console.log(id)

	 vm.$http.patch( "http://localhost:8080/api/photos/" + id,
	{currentprice: newprice})
	
	}

}





