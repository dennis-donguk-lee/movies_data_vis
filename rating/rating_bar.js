var margin = {top: 80, right: 180, bottom: 80, left: 180},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform",
					"translate(" + margin.left + "," + margin.top + ")");

d3.csv("rating_data.csv", function(error, data){

	var x = d3.scale.ordinal().rangeBands([0, width]);
	var y = d3.scale.linear().range([height, 0]);

	var xAxis = d3.svg.axis().scale(x).orient("bottom");

	x.domain(data.map( function(d) { return d.RATING; } ));
	y.domain([0, d3.max(data, function(d) { return d.COUNT; })]);

	svg.append("g")
    	.attr("class", "x axis")
    	.attr("transform", "translate(0," + height + ")")
    	.call(xAxis)
    	.selectAll("text")
      	.style("text-anchor", "end")
      	//.attr("dx", "em")
      	.attr("dy", ".75em");

	svg.selectAll("rectangle")
		.data(data)
		.enter()
		.append("rect")
		.attr("class","rectangle")
		.attr("width", width/data.length)
		.attr("height", function(d){
			return height - y(+d.COUNT);
		})
		.attr("x", function(d, i){
			return (width / data.length) * i ;
		})
		.attr("y", function(d){
			return y(+d.COUNT);
		})
		.append("title")
		.text(function(d){
			return d.RATING + "-RATINGS" + " : " + d.COUNT;
		});

});
