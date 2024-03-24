import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { format } from "date-fns";

interface LineChartProps {
  data: {
    Date: string;
    "Total Occ.": number;
    "Arr. Rooms": number;
    "Dep. Rooms": number;
  }[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const tooltipRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const svg = d3.select<SVGSVGElement, unknown>("#line-chart-svg");

    if (!svg) return;

    svg.selectAll("*").remove(); // Xóa tất cả các phần tử trong SVG trước khi vẽ lại

    const margin = { top: 20, right: 30, bottom: 130, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 360 - margin.top - margin.bottom;

    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => new Date(d.Date)) as [Date, Date])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, (d) =>
          Math.max(d["Total Occ."], d["Arr. Rooms"], d["Dep. Rooms"])
        ) || 0,
      ])
      .range([height, 0]);

    const color = d3
      .scaleOrdinal()
      .domain(["Total Occ.", "Arr. Rooms", "Dep. Rooms"])
      .range(["#ff7f0e", "#2ca02c", "#1f77b4"]);

    const line = d3
      .line<{ Date: Date; value: number }>()
      .x((d) => x(d.Date))
      .y((d) => y(d.value));

    const roomTypes = color.domain();

    roomTypes.forEach((type: string) => {
      g.append("path")
        .datum<{ Date: Date; value: number }[]>(
          data.map((d: any) => ({
            Date: new Date(d.Date),
            value: d[type as keyof typeof d],
          }))
        )
        .attr("class", "line")
        .attr("d", line)
        .style("stroke", () => color(type) as string)
        .style("stroke-width", "5px")
        .attr("id", "line-" + type)
        .attr("fill", "none");
    });

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3.axisBottom(x).tickFormat((date: any) => format(date, "dd/MM/yy"))
      );

    g.append("g").call(d3.axisLeft(y));

    const legend = svg
      .append("g")
      .attr("transform", `translate(0,${height + margin.bottom - 70})`);

    const legendLabels = ["Total Occ.", "Arr. Rooms", "Dep. Rooms"];

    legendLabels.forEach((label, i) => {
      legend
        .append("rect")
        .attr("x", 50)
        .attr("y", i * 20)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", () => color(label) as string);

      legend
        .append("text")
        .attr("x", 70)
        .attr("y", i * 20 + 6)
        .text(label)
        .attr("alignment-baseline", "middle");
    });

    g.on("mousemove", function (event) {
      const [xPos, yPos] = d3.pointer(event);
      const selectedDate = x.invert(xPos);
      const formattedDate = format(selectedDate, "dd/MM/yy");

      const tooltipData = data.find((item) => {
        const itemDate = format(new Date(item.Date), "dd/MM/yy");
        return itemDate == formattedDate;
      });

      if (tooltipData) {
        const tooltipText = `Total Occ.: ${tooltipData["Total Occ."]}
        <br>Arr. Rooms: ${tooltipData["Arr. Rooms"]}
        <br>Dep. Rooms: ${tooltipData["Dep. Rooms"]}
        <br>Date: ${formattedDate}`;

        if (tooltipRef.current) {
          tooltipRef.current.innerHTML = tooltipText;
          tooltipRef.current.style.display = "block";
          tooltipRef.current.style.position = "absolute";
          tooltipRef.current.style.left = xPos + "px";
          tooltipRef.current.style.top = yPos - 100 + "px";
        }
      }
    });

    g.on("mouseout", function () {
      if (tooltipRef.current) {
        tooltipRef.current.style.display = "none";
      }
    });
  }, [data]);

  return (
    <div className="w-full overflow-x-auto-custome relative">
      <svg id="line-chart-svg" className="bg-[#f1f1f1] rounded-lg"></svg>
      <div className="opacity-90">
        <p
          ref={tooltipRef}
          className=" absolute bg-white p-2 rounded-md border border-gray-300"
          style={{ display: "none" }}
        ></p>
      </div>
    </div>
  );
};

export default LineChart;
