var foo = d3.selectAll('p');

_.each(foo[0], function(item, index) {
  item.textContent = 'hello ' + index;
});


var parts = ["This is", "my first", "data join!"]

var sentence = d3.select("body").selectAll("div")
  .data(parts)
  .enter()
  .append("div")
  .text(function(d) { return d; });