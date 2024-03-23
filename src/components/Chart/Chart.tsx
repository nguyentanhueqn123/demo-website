import React, { useEffect } from "react";
import * as d3 from "d3";

interface BarChartProps {
  data: {
    property: string;
    room_revenue: number;
    FB_revenue: number;
    other_revenue: number;
  }[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  useEffect(() => {
    drawChart();
  }, [data]);

  const drawChart = () => {
    const margin = { top: 20, right: 30, bottom: 120, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const svg = d3
      .select("#bar-chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X scale
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.property))
      .range([0, width])
      .padding(0.1);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Y scale
    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(
          data,
          (d) => Math.max(d.room_revenue, d.FB_revenue, d.other_revenue) || 0
        ),
      ])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    // Bars
    const keys = ["room_revenue", "FB_revenue", "other_revenue"];
    const color = d3.scaleOrdinal().range(["#66c2a5", "#fc8d62", "#8da0cb"]);

    const barGroups = svg
      .selectAll(".bar-group")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "bar-group")
      .attr("transform", (d) => `translate(${x(d.property)}, 0)`);

    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "rgba(0, 0, 0, 0.7)")
      .style("color", "white")
      .style("padding", "5px")
      .style("border-radius", "5px");

    keys.forEach((key, i) => {
      barGroups
        .append("rect")
        .attr("x", () => (x.bandwidth() / keys.length) * i)
        .attr("y", (d) => y(d[key]))
        .attr("width", x.bandwidth() / keys.length)
        .attr("height", (d) => height - y(d[key]))
        .attr("fill", color(key))
        .on("mouseover", function (event, d) {
          const value = d[key].toFixed(2);
          const label = key.replace("_", " ");
          const labelText = label.replace(/^\w/, (c) => c.toUpperCase());
          const legendLabel = legendLabels[i];
          tooltip
            .style("visibility", "visible")
            .text(`${legendLabel}: $${value}`);
        })
        .on("mousemove", function (event) {
          tooltip
            .style("top", event.pageY - 10 + "px")
            .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", function () {
          tooltip.style("visibility", "hidden");
        });
    });

    // Legend
    // const legend = svg
    //   .append("g")
    //   .attr("transform", `translate(${width - 100},${margin.top})`);
    const legend = svg
      .append("g")
      .attr("transform", `translate(0,${height + margin.bottom - 80})`);

    const legendLabels = ["Room Revenue", "F&B Revenue", "Other Revenue"];
    legendLabels.forEach((label, i) => {
      legend
        .append("rect")
        .attr("x", 0)
        .attr("y", i * 20)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", color(keys[i]));

      legend
        .append("text")
        .attr("x", 20)
        .attr("y", i * 20 + 10)
        .text(label)
        .attr("alignment-baseline", "middle");
    });
  };

  return <svg id="bar-chart" className=" bg-red-100 mx-auto"></svg>;
};

export default BarChart;
