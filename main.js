const w = 700;
const h = 500;

//Get data from FreeCodeCamp's API, including a data key with an array of arrays as values.
//Each smaller array has first the date of a quarter and then the GDP in that date.
//There are 4 quarters per each year, from 1947 to 2015.

fetch(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
)
  .then((res) => res.json())
  .then((res) => {
    const { data } = res;
    createBarChart(data);
  });

const createBarChart = (data) => {
  const graph = d3.select("#graph-container");

  const title = graph
    .append("h1")
    .text("United States GDP")
    .attr("class", "title")
    .attr("id", "title");

  const svg = graph.append("svg").attr("width", w).attr("height", h);

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d, i) => i * 10)
    .attr("y", (d, i) => h - d[1])
    .attr("width", 7)
    .attr("height", (d, i) => d[1]);
};
