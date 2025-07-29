import { useEffect } from "react";

import useChart from "@/components/charts/hooks/useChart";
import ChartMainContainer from "@/components/charts/ChartMainContainer";
import { echartsInstance } from "@/components/charts/chartInstance";

type Props = {
	chartData: { name: number; value: number }[];
};

let base = +new Date(2023, 9, 3);
const oneDay = 24 * 3600 * 1000;
const date = [];
const data1 = [Math.random() * 300];
const data2 = [Math.random() * 100];

for (let i = 1; i < 1000; i++) {
	const now = new Date((base += oneDay));
	date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"));

	const next1 = Math.round((Math.random() - 0.5) * 20 + data1[i - 1]);
	const next2 = Math.round((Math.random() - 0.5) * 20 + data2[i - 1]);

	data1.push(Math.max(next1, 0));
	data2.push(Math.max(next2, 0));
}

const option = {
	tooltip: {
		trigger: "axis",
		position: function (pt: unknown[]) {
			return [pt[0], "10%"];
		},
	},
	grid: {
		top: 30,
		left: 30,
		right: 10,
	},
	title: {
		left: "center",
		text: "Sales and Tax Chart",
	},
	dataZoom: [
		{
			show: true,
			realtime: true,
			start: 90,
			end: 100,
		},
		{
			type: "inside",
			realtime: true,
			start: 0,
			end: 100,
		},
	],
	// toolbox: {
	// 	feature: {
	// 		dataZoom: {
	// 			yAxisIndex: "none",
	// 		},
	// 		restore: {},
	// 		saveAsImage: {},
	// 	},
	// },
	xAxis: {
		type: "category",
		boundaryGap: false,
		data: date,
	},
	yAxis: {
		type: "value",
		boundaryGap: [0, "100%"],
	},
	series: [
		{
			name: "Fake Data 1",
			type: "line",
			smooth: true,
			symbol: "none",
			areaStyle: {
				color: new echartsInstance.graphic.LinearGradient(0, 0, 0, 1, [
					{
						offset: 0,
						color: "rgba(255, 158, 68, 0.8)",
					},
					{
						offset: 1,
						color: "rgba(255, 70, 131, 0)",
					},
				]),
			},
			lineStyle: {
				color: "rgba(255, 158, 68, 1)",
			},
			data: data1,
		},
		{
			name: "Fake Data 2",
			type: "line",
			smooth: true,
			symbol: "none",
			areaStyle: {
				color: new echartsInstance.graphic.LinearGradient(0, 0, 0, 1, [
					{
						offset: 0,
						color: "rgba(0, 221, 255, 0.8)",
					},
					{
						offset: 1,
						color: "rgba(77, 119, 255, 0)",
					},
				]),
			},
			lineStyle: {
				color: "rgba(0, 221, 255, 1)",
			},
			data: data2,
		},
	],
};

export default function DashboardChart(props: Props) {
	const { chart, chartId } = useChart({ chartId: "DashboardChart" });

	useEffect(() => {
		chart?.setOption(
			option,
			// 	{
			// 	grid: {
			// 		top: 20,
			// 		left: 60,
			// 		right: 50,
			// 	},
			// 	tooltip: {
			// 		show: true,
			// 	},
			// 	xAxis: {
			// 		type: "category",
			// 		boundaryGap: false,
			// 		axisLabel: { show: true },
			// 		splitLine: {
			// 			show: true,
			// 			lineStyle: {
			// 				type: "dashed",
			// 			},
			// 		},
			// 		data: props.chartData.map((data) => data?.name),
			// 	},
			// 	yAxis: {
			// 		axisLabel: { show: true },
			// 		type: "value",
			// 		boundaryGap: true,
			// 		splitLine: {
			// 			show: true,
			// 			lineStyle: {
			// 				type: "dashed",
			// 			},
			// 		},
			// 	},
			// 	dataZoom: [
			// 		{
			// 			show: true,
			// 			realtime: true,
			// 			start: startAt(props.chartData?.length || 0),
			// 			end: 100,
			// 		},
			// 		{
			// 			type: "inside",
			// 			realtime: true,
			// 			start: 0,
			// 			end: 100,
			// 		},
			// 	],
			// 	series: [
			// 		{
			// 			type: "line",
			// 			smooth: 0.5,
			// 			areaStyle: {
			// 				color: "rgba(92,159,215,0.3)",
			// 			},
			// 			lineStyle: {
			// 				color: "rgba(41,119,227,0.49)",
			// 				width: 1.5,
			// 			},
			// 			itemStyle: {
			// 				width: 2,
			// 				color: "rgb(40,69,211)",
			// 			},
			// 			data: props.chartData,
			// 		},
			// 	],
			// }
		);
	}, [chart, props.chartData]);

	return <ChartMainContainer id={chartId} chart={chart} />;
}
