var margin = {top: 20, right: 10, bottom: 20, left: 10};

var width = 460 - margin.left - margin.right,
  height = 900 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var url = 'https://raw.githubusercontent.com/thisismetis/data-visualization-cohort-2/master/class3/barley.tsv?token=AEWkF01gA_8cKquu-TRub4nYfzhAaUzQks5WEw3WwA%3D%3D';
var dataModel = {};
var yAxisValues = {};
var xAxisValues = {};

d3.tsv(url, function(error, data) {
  if (error) {
    throw error;
  }

  data.forEach(function(item) {
    var singlePoint = {
      y: item.variety,
      x: Number(item.year),
      radius: Number(item.yield)
    };

    if (!dataModel[item.site]) {
      dataModel[item.site] = [];
    }

    if (dataModel[item.site]) {
      yAxisValues[singlePoint.y] = 1;
      xAxisValues[singlePoint.x] = 1;
      dataModel[item.site].push(singlePoint);
    }

  });

  ready(dataModel, xAxisValues, yAxisValues);
});

function ready(dataModel, xAxisValues, yAxisValues) {

  var cropNames = _.keys(yAxisValues);
  var uniqueYears = _.map(_.keys(xAxisValues), Number);

  var xScale = d3.scale.linear()
    .domain([1930, 1931, 1932, 1933, 1934])
    .range([0, width]);

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .tickValues(uniqueYears);

  var yScale = d3.scale.ordinal()
    .domain(cropNames)
    .rangeBands([0, height]);

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("right");

  var rScale = d3.scale.linear()
    .domain([0, 50])
    .range([0,10]);

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("transform", "translate(0,0)")
    .call(yAxis);


  var circle = svg.selectAll("circle")
    .data(dataModel.Crookston)
    .enter()
    .append("circle")
    .attr("r", function(d) {
      return rScale(d.radius);
    })
    .attr("cx", function (d) {
      return xScale(d.x);
    })
    .attr("cy", function (d) {
      return yScale(d.y);
    });

}


