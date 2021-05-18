/*
*    main.js
*/

var width = 1300;
var height = 720;

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
.range(d3.schemeSet3)

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
var formattedData = []
var interval = {}
var time = 215 // Has to be higher than 214 so it starts at zero

d3.json("data/data.json").then(function(data){
	var legend = g.append("g")
	.attr("transform", "translate(" + (width - 10) + "," + (height - 125) + ")")

	continents = [...new Set(data[0].countries.map(d => d.continent))]

	continents.forEach((continent, i) => {
		var legendRow = legend.append("g")
		.attr("transform", "translate(0, " + (i * 20) + ")")

		color.domain(continents)

		legendRow.append("rect")
		.attr("width", 10)
		.attr("height", 10)
		.attr("y", -60)
		.attr("fill", color(continent))

		legendRow.append("text")
		.attr("x", -10)
		.attr("y", -50)
		.attr("text-anchor", "end")
		.style("text-transform", "capitalize")
		.text(continent)
	})

	formattedData = data.map(year => {
		return year["countries"].filter(country => {
			var dataExists = (country.income && country.life_exp)
			return dataExists
		}).map(country => {
			country.income = +country.income;
			country.life_exp = +country.life_exp;
			return country;
		})
	})
})

const step = () => {
	time = (time < 214) ? time+1 : 0
	update(formattedData[time])
}

$("#play-button").click(function () {
	var button = $(this)
	if (button.text() == "Play"){
		button.text("Pause")
		interval = setInterval(step, 100)
	} else {
		button.text("Play")
		clearInterval(interval)
	}
})

$("#continent-select").on("change", () => {
	update(formattedData[time])
})

$("#date-slider").slider({
	max: 2014, min: 1800, step: 1,		// Options
	slide:(event, ui) => {			// Events
		time = ui.value - 1800
		update(formattedData[time])
	}
})

const update = (data) => {
	var continent = $("#continent-select").val();
	data = data.filter((d) => {
		if (continent == "all") return true
		else return d.continent == continent
	})

	$("#date-slider").slider("value", +(time + 1800))
	$("#year")[0].innerHTML = +(time + 1800)

	yearLabel.text(1800 + time)

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