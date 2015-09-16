var parts = ["This is", "my first", "data join!"]

var sentence = d3.select("body").selectAll("p")
  .data(parts)
  .enter()
  .append("p")
  .text(function(d) { return d; });