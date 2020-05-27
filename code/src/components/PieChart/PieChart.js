
import React, { Component } from 'react'
import * as d3 from 'd3'


// margin convention often used with D3

class PieChart extends Component {




    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
    
        var radius = Math.min(this.state.width, this.state.height) / 2 - this.state.margin


        // append the svg object to the div called 'my_dataviz'
        
        var svg = d3.select(".myDiv")
            .append("svg")
            .attr("width", this.state.width)
            .attr("height", this.state.height)
            .append("g")
            .attr("transform", "translate(" + this.state.width / 2 + "," + this.state.height / 2 + ")");

        // Create dummy data
        const datainfo = { Positive: this.props.positive, Negative: this.props.negative }
        
        // set the color scale
        var color = d3.scaleOrdinal()
            .domain(datainfo)
            .range(d3.schemeSet1);

            
        // Compute the position of each group on the pie:
        var pie = d3.pie()
            .value(function (d) { return d.value; })
        var data_ready = pie(d3.entries(datainfo))
        // Now I know that group A goes from 0 degrees to x degrees and so on.

        // shape helper to build arcs:
        var arcGenerator = d3.arc()
            .innerRadius(0)
            .outerRadius(radius)

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
            .selectAll('mySlices')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', arcGenerator)
            .attr('fill', function (d) { return (color(d.data.key)) })
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)

        // Now add the annotation. Use the centroid method to get the best coordinates
        svg
            .selectAll('mySlices')
            .data(data_ready)
            .enter()
            .append('text')
            .text(function (d) { return d.data.key })
            .attr("transform", function (d) { return "translate(" + arcGenerator.centroid(d) + ")"; })
            .style("text-anchor", "middle")
            .style("font-size", 17)
    }

    render() {
        return (
            <div className="myDiv"></div>

        )
    }


    constructor(props) {
        super(props);

        this.state = {
           
            width: 450,
            height: 450,
            margin: 40,

        };
    }
}


export default PieChart
