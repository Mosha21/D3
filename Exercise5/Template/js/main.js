var margin = {top: 20, right: 20, bottom: 30, left:10};
var width = 900;
var height = 600;
var g = d3.select("body")
.append("svg")
.attr("width", width + margin.right + margin.left)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


// var x = d3.scaleLinear()
// .domain([0, 1000])
// .range([0, width * .70]);
// var y = d3.scaleLinear()
// .domain([0, 100])
// .range([0, height * .90]);

// // d3.axisBottom(x).ticks(15);
// // d3.axisBottom(x).tickValues([1,2,3,5,7,10]);

// // d3.axisBottom(x).tickSize(5);
// // d3.axisLeft(y).tickSizeOuter(10).tickSizeInner(5);

// // var yAxisCall = d3.axisLeft(y).ticks(3)
// // .tickFormat((d) => { return d + "m"; });


// var xAxisCall = d3.axisBottom(x).ticks(15);
// g.append("g")
// .attr("class", "x axis")
// .attr("transform", "translate(50, " + height + ")")
// .call(xAxisCall)
// .selectAll("text")
// .attr("y", "15")
// .attr("x", "15")
// .attr("text-anchor", "end")
// .attr("transform", "rotate(30)")


// // Y Label

// g.append("text")
// .attr("class", "y axis-label")
// .attr("x", - (height / 2))
// .attr("y", 25)
// .attr("font-size", "20px")
// .attr("text-anchor", "middle")
// .attr("transform", "rotate(-90)")
// .style("fill","black")
// .text("Height (m)")


var legend = g.append("g")
.attr("transform", "translate(" + (width - 10) + "," + (height - 125) + ")");

var continents = ["europe", "asia", "americas", "africa"];
continents.forEach((continent, i) => {
	var legendRow = legend.append("g")
	.attr("transform", "translate(0, " + (i * 20) + ")");

	var continentColor = d3.scaleOrdinal()
	.domain(continents)
	.range(d3.schemeSet3)

	legendRow.append("rect")
	.attr("width", 10)
	.attr("height", 10)
	.attr("fill", continentColor(continent));

	legendRow.append("text")
	.attr("x", -10)
	.attr("y", 10)
	.attr("text-anchor", "end")
	.style("text-transform", "capitalize")
	.text(continent);
});

//*************************************************************************************************

// var width = 600;
// var height = 400;

// var margin = {top: 10, right: 10, bottom: 100, left:100};

// var svg = d3.select("#chart-area").append("svg")
// .attr("width", width + margin.right + margin.left)
// .attr("height", height + margin.top + margin.bottom)

// var g = svg.append("g")
// .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")


// d3.json("data/buildings.json").then(data => {

// 	data.forEach(d => {
// 		d.height = +d.height
// 	})


// 	names = data.map(d => d.name)
// 	var x = d3.scaleBand()
// 	.domain(names)
// 	.range([0, width])
// 	.paddingInner(0.3)
// 	.paddingOuter(0.3)
// 	var y = d3.scaleLinear()
// 	.domain([800, 0])
// 	.range([0, height])

// 	var xAxisCall = d3.axisBottom(x)
// 	.tickFormat((d, i) => names[i])
// 	var yAxisCall = d3.axisLeft(y).ticks(5)
	
// 	g.append("g")
// 	.attr("class", "x axis")
// 	.attr("transform", "translate(0, " + height + ")")
// 	.call(xAxisCall)
// 	.selectAll("text")
// 	.attr("y", "15")
// 	.attr("x", "10")
// 	.attr("text-anchor", "end")
// 	.attr("transform", "rotate(-35)")
// 	.attr("font-size", "8px")
	
// 	g.append("g")
// 	.attr("class", "left axis")
// 	.call(yAxisCall)
	
// 	var rectangles = g.selectAll("rect").data(data)
// 	rectangles.enter().append("rect")
// 	.attr("y", (d) => { return y(d.height); })
// 	.attr("x", (d) => { return x(d.name); })
// 	.attr("width", x.bandwidth)
// 	.attr("height", (d) => { return height - y(d.height); })
// 	.attr("fill", "grey")
// })

// // X Label

// g.append("text")
// .attr("class", "x axis-label")
// .attr("x", width / 2)
// .attr("y", height + 95)
// .attr("font-size", "20px")
// .attr("text-anchor", "middle")
// //.attr("transform", "rotate(-90)")
// .style("fill","black")
// .text("The word's tallest buildings")

// // Y Label

// g.append("text")
// .attr("class", "y axis-label")
// .attr("x", - (height / 2))
// .attr("y", -60)
// .attr("font-size", "20px")
// .attr("text-anchor", "middle")
// .attr("transform", "rotate(-90)")
// .style("fill","black")
// .text("Height (m)")