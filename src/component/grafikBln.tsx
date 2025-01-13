import React from "react";
import {
  VictoryChart,
  VictoryBar,
  VictoryGroup,
  VictoryAxis,
  VictoryTheme,
} from "victory";

interface ChartPenjualanProps {
  title: string;
  datasets: { label: string; data: { month: string; sales: number }[] }[];
}

const ChartPenjualan: React.FC<ChartPenjualanProps> = ({ title, datasets }) => {
  return (
    <div className="bg-black p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
        height={300}
        width={400}
      >
        {/* Sumbu X */}
        <VictoryAxis
          style={{
            tickLabels: { fill: "white", fontSize: 10, padding: 5 },
          }}
        />
        {/* Sumbu Y */}
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: { fill: "white", fontSize: 10, padding: 5 },
          }}
        />
        {/* Grafik Data */}
        <VictoryGroup
          offset={10}
          colorScale={["#0284c7", "#0ea5e9", "#7dd3fc"]} // Warna batang
        >
          {datasets.map((dataset, index) => (
            <VictoryBar key={index} data={dataset.data} x="month" y="sales" />
          ))}
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
};

export default ChartPenjualan;
