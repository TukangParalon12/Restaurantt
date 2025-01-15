import React, { useState } from "react";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
} from "victory";

const GrafikChart: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(2024);

  const dataByYear: Record<number, { x: string; y: number }[][]> = {
    2024: [
      [
        { x: "Jan", y: 3 },
        { x: "Feb", y: 4 },
        { x: "Mar", y: 2 },
        { x: "Apr", y: 5 },
        { x: "Mei", y: 3 },
        { x: "Jun", y: 3 },
        { x: "Jul", y: 4 },
        { x: "Ags", y: 2 },
        { x: "Sep", y: 5 },
        { x: "Okt", y: 3 },
        { x: "Nov", y: 5 },
        { x: "Des", y: 3 },
      ],
      [
        { x: "Jan", y: 2 },
        { x: "Feb", y: 3 },
        { x: "Mar", y: 4 },
        { x: "Apr", y: 3 },
        { x: "Mei", y: 4 },
        { x: "Jun", y: 2 },
        { x: "Jul", y: 3 },
        { x: "Ags", y: 4 },
        { x: "Sep", y: 3 },
        { x: "Okt", y: 4 },
        { x: "Nov", y: 3 },
        { x: "Des", y: 4 },
      ],
      [
        { x: "Jan", y: 4 },
        { x: "Feb", y: 2 },
        { x: "Mar", y: 5 },
        { x: "Apr", y: 4 },
        { x: "Mei", y: 3 },
        { x: "Jun", y: 2 },
        { x: "Jul", y: 3 },
        { x: "Ags", y: 4 },
        { x: "Sep", y: 3 },
        { x: "Okt", y: 4 },
        { x: "Nov", y: 3 },
        { x: "Des", y: 4 },
      ],
    ],
    2025: [
      [
        { x: "Jan", y: 4 },
        { x: "Feb", y: 3 },
        { x: "Mar", y: 5 },
        { x: "Apr", y: 6 },
        { x: "Mei", y: 2 },
        { x: "Jun", y: 3 },
        { x: "Jul", y: 4 },
        { x: "Ags", y: 5 },
        { x: "Sep", y: 2 },
        { x: "Okt", y: 3 },
        { x: "Nov", y: 4 },
        { x: "Des", y: 5 },
      ],
      [
        { x: "Jan", y: 3 },
        { x: "Feb", y: 2 },
        { x: "Mar", y: 4 },
        { x: "Apr", y: 3 },
        { x: "Mei", y: 5 },
        { x: "Jun", y: 4 },
        { x: "Jul", y: 3 },
        { x: "Ags", y: 2 },
        { x: "Sep", y: 4 },
        { x: "Okt", y: 3 },
        { x: "Nov", y: 4 },
        { x: "Des", y: 2 },
      ],
      [
        { x: "Jan", y: 5 },
        { x: "Feb", y: 4 },
        { x: "Mar", y: 3 },
        { x: "Apr", y: 5 },
        { x: "Mei", y: 4 },
        { x: "Jun", y: 3 },
        { x: "Jul", y: 5 },
        { x: "Ags", y: 4 },
        { x: "Sep", y: 3 },
        { x: "Okt", y: 2 },
        { x: "Nov", y: 5 },
        { x: "Des", y: 4 },
      ],
    ],
  };

  return (
    <div className="p-4 rounded-lg">
      <VictoryChart
        domainPadding={{ x: 20 }}
        theme={VictoryTheme.material}
        height={350}
        width={600}
        style={{ background: { fill: "#111315" } }}
      >
        <VictoryAxis
          style={{
            axis: { stroke: "none" },
            tickLabels: { fill: "white", fontSize: 10 },
            axisLabel: { fill: "none" },
            grid: { stroke: "none" },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: "none" },
            tickLabels: { fill: "none" },
            axisLabel: { fill: "none" },
            grid: { stroke: "none" },
          }}
        />
        <VictoryStack colorScale={["#067487", "#37CAE4", "#8EDAE8"]}>
          {dataByYear[selectedYear].map((data, index) => (
            <VictoryBar key={index} data={data} barWidth={30} />
          ))}
        </VictoryStack>
      </VictoryChart>
      <div className="flex justify-center mt-4 space-x-2">
        {Object.keys(dataByYear).map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(Number(year))}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              selectedYear === Number(year)
                ? "bg-white text-black"
                : "bg-[#363636] text-white"
            }`}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GrafikChart;
