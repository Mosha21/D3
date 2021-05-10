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
		var newData = flag ? data : data.slice(1)
		update(newData)
		flag = !flag
	}, 2000)

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

	xAxisGroup.transition(300).call(xAxisCall)
    yAxisGroup.transition(300).call(yAxisCall)

	var bars = g.selectAll("rect")
	.data(data, d => d.month)

	bars.exit().attr("fill", "red")
	.transition(300)
	.attr("y", y(0))
	.attr("height", 0)
	.remove()

	bars.transition(300)
	.attr("x", d => x(d.month))
	.attr("width", x.bandwidth)
	.attr("y", d => y(d[value]))
	.attr("height", d => height - y(d[value]))

	bars.enter().append("rect")
	.attr("fill", "yellow")
	.attr("x", d => x(d.month))
	.attr("y", y(0))
	.attr("height", 0)
	.attr("width", x.bandwidth)
	.transition(300)
	.attr("height", d => height - y(d[value]))
	.attr("y", d => y(d[value]))
}

