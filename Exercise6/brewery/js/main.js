/*
*    main.js
*/

var width = 800;
var height = 500;

var margin = {top: 10, right: 10, bottom: 100, left:100};

var flag = true

var svg = d3.select("#chart-area").append("svg")
.attr("width", width + margin.right + margin.left)
.attr("height", height + margin.top + margin.bottom)

var g = svg.append("g")
.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")

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

var yLabel = g.append("text")
//g.append("text")
.attr("class", "y axis-label")
.attr("x", - (height / 2))
.attr("y", -60)
.attr("font-size", "30px")
.attr("text-anchor", "middle")
.attr("transform", "rotate(-90)")
.style("fill","black")
.text("Revenue (dlls.)")

var x = d3.scaleBand()
.range([0, width])
.padding(0.2)

var y = d3.scaleLinear()
.range([0, height])

var xAxisGroup = g.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0, " + height + ")")

var yAxisGroup = g.append("g")
.attr("class", "left axis")

// LOAD DATA
d3.json("data/revenues.json").then(data => {
    data.forEach(element => {
        element.revenue = +element.revenue
		element.profit = +element.profit
    })

	d3.interval(() => {
		update(data)
		flag = !flag
	}, 1000)

	update(data)
}).catch(error => {
	console.log(error)
})

// UPDATE
const update = (data) => {
	var value = flag ? "revenue" : "profit"

	var label = flag ? "Revenue" : "Profit"
	yLabel.text(label)

	x.domain(data.map(d => d.month))
	y.domain([d3.max(data, d => d[value]), 0])

    var xAxisCall = d3.axisBottom(x)
	var yAxisCall = d3.axisLeft(y)
    .tickFormat(d => d3.format("$.2s")(d))

	xAxisGroup.call(xAxisCall)
    yAxisGroup.call(yAxisCall)

    var rectangles = g.selectAll("rect").data(data)
	rectangles.enter().append("rect")
	.attr("y", (d) => y(d[value]))
	.attr("x", (d) => x(d.month))
	.attr("width", x.bandwidth)
	.attr("height", (d) => height - y(d[value]))
	.attr("fill", "yellow")

	var bars = g.selectAll("rect").data(data)

	bars.exit().remove()

	bars.attr("x", d => x(d.month))
	.attr("y", d => y(d[value]))
	.attr("width", x.bandwidth)
	.attr("height", d => height - y(d[value]))

	bars.enter().append("rect")
	.attr("x", d => x(d.month))
	.attr("y", d => y(d[value]))
	.attr("width", x.bandwidth)
	.attr("height", d => height - y(d[value]))
	.attr("fill", "yellow")
}

