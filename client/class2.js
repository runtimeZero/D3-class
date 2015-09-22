var data = [
  {x: 10, y:	9.14},
  {x: 8,	y:8.14},
  {x: 13, y:	8.74},
  {x: 9,	y:8.77},
  {x: 11,y:9.26},
  {x: 14,y:8.1},
  {x:6, y:6.13},
  {x:4, y:	3.1},
  {x:12,y:9.13},
  {x:7, y:	7.26},
  {x:5, y:	4.74}
];

var width = 720;
var height = 400;
var margin = {top: 20, right: 10, bottom: 20, left: 10};

var width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var xMin = d3.min(data, function (point) {
  return point.x;
});

var xMax = d3.max(data, function (point) {
  return point.x;
});

var yMin = d3.min(data, function (point) {
  return point.y;
});

var yMax = d3.max(data, function (point) {
  return point.y;
});

var xScale = d3.scale.linear().domain([0, xMax]).range([0, width]);
var yScale = d3.scale.linear().domain([0, yMax]).range([height, 0]);

var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xAxis = d3.svg
  .axis()
  .scale(xScale)
  .orient('bottom');

var yAxis = d3.svg
  .axis()
  .scale(yScale)
  .orient('left');

svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

svg.append("g")
  .attr("transform", "translate(" + width + ",0)")
  .call(yAxis);




var circle = svg.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr({
    cx: function(d) {
      return xScale(d.x);
    },
    cy: function(d) {
      return yScale(d.y)
    },
    r: function(d){
      return 10;
    }

  });

