import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

interface IStateChartsProps {
  list: { [estado: string]: number };
}

export function StateCharts({ list }: IStateChartsProps) {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <ReactApexChart
        options={{
          chart: {
            width: 380,
            type: "pie",
          },
          labels: Object.keys(list),
          legend: {
            show: windowSize < 480 ? false : true,
          },
        }}
        series={Object.values(list).map((data) => Number(data))}
        type="pie"
        width={windowSize < 480 ? 280 : 380}
      />
    </div>
  );
}
