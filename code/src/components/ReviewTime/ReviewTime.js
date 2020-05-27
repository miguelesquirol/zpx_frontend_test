
import React, { Component } from 'react'
import * as d3 from 'd3'


// margin convention often used with D3

class PieChart extends Component {




    componentDidMount() {
        if (this.props.data) {
                
            this.drawChart();
        }
        else {
         

        }
    }

    drawChart() {
        var propData = []
        propData = (this.state.data)
        var svg = d3.select(".myDiv2").append("svg")
        .attr("width", 960)
        .attr("height", 300)
  
      var margin = {left:30, right:30, top: 10, bottom: 20}
      var width = svg.attr("width") - margin.left - margin.right;
      var height = svg.attr("height") - margin.bottom - margin.top;
      
     
       var data = this.props.data;
      

      var x = d3.scaleTime()
          .rangeRound([0, width]);
      var x_axis = d3.axisBottom(x);
      
      var y = d3.scaleLinear()
          .rangeRound([height, 0]);
      var y_axis = d3.axisBottom(y);
      var xFormat = "%Y-%m-%d";;
      var parseTime = d3.timeParse("%Y-%m-%d");
      
      x.domain(d3.extent(data, function(d) { return parseTime(d.date); }));
        y.domain([0, 
                d3.max(data, function(d) { 
                  return d3.max([d.a, d.b, d.c, d.d]);
                })]);
  
      var a = function(d) {return d.a};
      
      var multiline = function(category) {
        var line = d3.line()
                    .x(function(d) { return x(parseTime(d.date)); })
                    .y(function(d) { return y(d[category]); });
        return line;
      }
      
     
  
      var categories = ['a', 'b', 'c', 'd'];
      //var color = d3.scale.category10();  // escala com 10 cores (category10)
      var color = d3.scaleOrdinal(d3.schemeCategory10);
      
      var g = svg.append("g")
          .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
      var i;
      for (i in categories) {
        var lineFunction = multiline(categories[i]);
        g.append("path")
          .datum(data) 
          .attr("class", "line")
          .attr("fill", "none")
          .attr("stroke-width", "3")
          .style("stroke", color(i))
          .attr("d", lineFunction);
      }
      
        // Add the X Axis
            g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat(xFormat)));
      
        // Add the Y Axis
            g.append("g")
        .call(d3.axisLeft(y));
  
        }

    render() {
        return (
            <div className="myDiv2"></div>

        )
    }


    constructor(props) {
        super(props);

        this.state = {
            data: [],
            width: 450,
            height: 450,
            margin: 40,

        };
    }
}


export default PieChart
