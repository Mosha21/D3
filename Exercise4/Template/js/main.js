
var svg = d3.select("#chart-area").append("svg")
.attr("width", 500)
.attr("height", 500)

d3.json("data/buildings.json").then(data => {
	const maxHeight = Math.max.apply(Math, data.map(o => { return o.height; }))

	data.forEach(d => {
		d.height = +d.height
	})

	var x = d3.scaleBand()
	.domain(data.map(d => d.name))
	.range([0, 400])
	.paddingInner(0.3)
	.paddingOuter(0.3);

	var y = d3.scaleLinear()
	.domain([0, 828])
	.range([0, 400])

	var color = d3.scaleOrdinal()
	.domain(data.map(d => d.name))
	.range(d3.schemeSet3)
	
	var rectangles = svg.selectAll("rect").data(data)
	rectangles.enter().append("rect")
	.attr("height", d => {
		return d.height
	})
	.attr("width", 20)
	.attr("x", d => x(d.name))
	.attr("y", d => y(d.height))
	.attr("fill", d => color(d.name))
})

