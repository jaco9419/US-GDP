const w = 800;
console.log(w);
const h = 400;
console.log(h);

const tooltip = document.getElementById("tooltip");

//Get data from FreeCodeCamp's API, including a data key with an array of arrays as values.
//Each smaller array has first the date of a quarter and then the GDP in that date.
//There are 4 quarters per each year, from 1947 to 2015.
fetch(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
)
  .then((res) => res.json())
  .then((res) => {
    const { data } = res;
    createBarChart(data.map((d) => [d[0], d[1]]));
  });

//Handle SVG and d3
const createBarChart = (data) => {
  const graph = d3.select("#graph-container");

  const barMargin = 0.2;
  const padding = 40;
  const barWidth = (w - 2 * padding) / data.length;

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d[1])])
    .range([h - padding, padding]);

  const xScale = d3
    .scaleTime()
    .domain([
      d3.min(data, (d) => new Date(d[0])),
      d3.max(data, (d) => new Date(d[0])),
    ])
    .range([padding, w - padding]);

  const title = graph
    .append("h1")
    .text("US GDP History")
    .attr("class", "title")
    .attr("id", "title");

  const svg = graph.append("svg").attr("width", w).attr("height", h);

  //Create bars
  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("data-date", (d) => d[0])
    .attr("data-gdp", (d) => d[1])
    .attr("x", (d, i) => xScale(new Date(d[0])))
    .attr("y", (d, i) => yScale(d[1]))
    .attr("width", barWidth)
    .attr("height", (d, i) => h - yScale(d[1]) - padding)
    .on("mouseover", (d, i) => {
      let tooltipDistance = padding * 2.5;

      tooltip.classList.add("show");
      tooltip.style.left = i * barWidth + tooltipDistance + "px";
      tooltip.style.top = h - 2 * padding + "px";
      tooltip.setAttribute("data-date", d[0]);

      tooltip.innerHTML = d[0] + "<br />" + d[1];
    })
    .on("mouseout", () => {
      tooltip.classList.remove("show");
    });

  //Create Axes
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${h - padding})`)
    .call(xAxis);

  svg
    .append("g")
    .attr("id", "y-axis")
    .attr("transform", `translate(${padding}, 0)`)
    .call(yAxis);
};
