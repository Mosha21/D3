/*
*    main.js
*/
d3.json("data/ages.json").then(data => {
	data.forEach((d)=>{
		d.age = +d.age
	});
	console.log(data);
	var svg = d3.select("#chart-area").append("svg")
	.attr("width", 400)
	.attr("height", 400)

	var circles = svg.selectAll("circle").data(data)
	circles.enter().append("circle")
	.attr("cx", (d, i) => {
        return i * 60 + 25
    })
	.attr("cy", 200)
	.attr("r", d => {
		return d.age;
	})
	.attr("fill", d => {
		if(d.age > 10) return "green"
		return "red"
	})
}).catch(error => {
	console.log(error)
})

d3.json("data/buildings.json").then(data => {
	const maxHeight = Math.max.apply(Math, data.map(o => { return o.height; }))

	data.forEach(d => {
		d.height = +d.height
	})
	
	var svg = d3.select("#chart-area").append("svg")
	.attr("width", 400)
	.attr("height", 850)

	var rectangles = svg.selectAll("rect").data(data)
	rectangles.enter().append("rect")
	.attr("height", d => {
		return d.height
	})
	.attr("width", 20)
	.attr("x", (d, i) => {
		return i * 30 + 25
	})
	.attr("y", d => {
		return maxHeight - d.height
	})
})