/*
*    main.js
*/

var width = 1300;
var height = 750;

var margin = {top: 20, right: 20, bottom: 100, left:100};

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
.style("fill","black")
.text("GDP Per Capita")

// Y Label

var yLabel = g.append("text")
.attr("class", "y axis-label")
.attr("x", - (height / 2))
.attr("y", -60)
.attr("font-size", "30px")
.attr("text-anchor", "middle")
.attr("transform", "rotate(-90)")
.style("fill","black")
.text("Life Expectancy (Years)")

var yearLabel = g.append("text")
.attr("class", "y axis-label")
.attr("x", width - 50)
.attr("y", height - 50)
.attr("font-size", "20px")
.style("fill","black")
.text("")

var x = d3.scaleLog()
.range([0, width])
.domain([142, 150000])
.base(10)

var y = d3.scaleLinear()
.range([0, height])
.domain([90, 0])

var area = d3.scaleLinear()
.domain([2000, 1400000000])
.range([25*Math.PI, 1500*Math.PI])

var color = d3.scaleOrdinal()
.range(d3.schemePastel1)

var xAxisGroup = g.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0, " + height + ")")

var yAxisGroup = g.append("g")
.attr("class", "left axis")

var xAxisCall = d3.axisBottom(x).tickValues([400, 4000, 40000])
.tickFormat(d => d3.format("$")(d))
var yAxisCall = d3.axisLeft(y)

xAxisGroup.transition(300).call(xAxisCall)
yAxisGroup.transition(300).call(yAxisCall)

var continents = []

d3.json("data/data.json").then(function(data){
	var legend = g.append("g")
	.attr("transform", "translate(" + (width - 10) + "," + (height - 125) + ")")

	continents = [...new Set(data[0].countries.map(d => d.continent))]

	continents.forEach((continent, i) => {
		var legendRow = legend.append("g")
		.attr("transform", "translate(0, " + (i * 20) + ")")

		var continentColor = d3.scaleOrdinal()
		.domain(continents)
		.range(d3.schemeSet3)

		legendRow.append("rect")
		.attr("width", 10)
		.attr("height", 10)
		.attr("y", -60)
		.attr("fill", continentColor(continent))

		legendRow.append("text")
		.attr("x", -10)
		.attr("y", -50)
		.attr("text-anchor", "end")
		.style("text-transform", "capitalize")
		.text(continent)
	})

	color.domain(continents)

	const formattedData = data.map(year => {
		return year["countries"].filter(country => {
			var dataExists = (country.income && country.life_exp)
			return dataExists
		}).map(country => {
			country.income = +country.income;
			country.life_exp = +country.life_exp;
			return country;
		})
	})

	var counter = 0
	d3.interval(() => {
		update(formattedData[counter], data[counter].year)
		counter = counter < formattedData.length - 1 ? counter + 1 : 0
	}, 1000)
	
	update(formattedData[counter], data[counter].year)
	counter++
})

const update = (data, year) => {
	yearLabel.text(year)

	var circles = g.selectAll("circle")
	.data(data, d => d.country)

	circles.enter().append("circle")
	.attr("cx", d => x(d.income))
	.attr("cy", d => y(d.life_exp))
	.attr("r", d =>  Math.sqrt(area(d.population) / Math.PI))
	.attr("fill", d => color(d.continent))

	circles.transition(300)
	.attr("cx", d => x(d.income))
	.attr("cy", d => y(d.life_exp))
	.attr("r", d =>  Math.sqrt(area(d.population) / Math.PI))
	.attr("fill", d => color(d.continent))

	circles.exit()
	.remove()
}