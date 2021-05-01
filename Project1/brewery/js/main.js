/*
*    main.js
*/

var width = 800;
var height = 500;

var margin = {top: 10, right: 10, bottom: 100, left:100};

var svg = d3.select("#chart-area").append("svg")
.attr("width", width + margin.right + margin.left)
.attr("height", height + margin.top + margin.bottom)

var g = svg.append("g")
.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")

d3.json("data/revenues.json").then(data => {
    data.forEach(element => {
        element.revenue = +element.revenue
    })

    var x = d3.scaleBand()
	.domain(data.map(d => d.month))
	.range([0, width])
	.paddingInner(0.3)
	.paddingOuter(0.3)

	var y = d3.scaleLinear()
	.domain([d3.max(data, d => d.revenue), 0])
	.range([0, height])

    var xAxisCall = d3.axisBottom(x)
	var yAxisCall = d3.axisLeft(y)
    .tickFormat(d => d3.format("$.2s")(d))

    g.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0, " + height + ")")
	.call(xAxisCall)

    g.append("g")
    .attr("class", "left axis")
    .call(yAxisCall)

    var rectangles = g.selectAll("rect").data(data)
	rectangles.enter().append("rect")
	.attr("y", (d) => y(d.revenue))
	.attr("x", (d) => x(d.month))
	.attr("width", x.bandwidth)
	.attr("height", (d) => height - y(d.revenue))
	.attr("fill", "yellow")
})

// X Label

g.append("text")
.attr("class", "x axis-label")
.attr("x", width / 2)
.attr("y", height + 60)
.attr("font-size", "30px")
.attr("text-anchor", "middle")
//.attr("transform", "rotate(-90)")
.style("fill","black")
.text("MONTH")

// Y Label

g.append("text")
.attr("class", "y axis-label")
.attr("x", - (height / 2))
.attr("y", -60)
.attr("font-size", "30px")
.attr("text-anchor", "middle")
.attr("transform", "rotate(-90)")
.style("fill","black")
.text("Revenue (dlls.)")