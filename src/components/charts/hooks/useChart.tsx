import type { EChartsType } from "echarts";
import { useEffect, useState } from "react";

import { echartsInstance } from "../chartInstance";

type Params = {
	chartId: string;
	className?: string;
};
export default function useChart(params: Params) {
	const [chart, setChart] = useState<EChartsType | undefined>(undefined);
	useEffect(() => {
		const dom = document.getElementById(params.chartId);
		if (!dom) {
			return;
		}
		if (!chart) {
			const existDom = echartsInstance.getInstanceByDom(dom);

			const newChart =
				existDom ||
				echartsInstance.init(dom, undefined, {
					renderer: "canvas",
				});
			setChart(newChart);
		}
	}, [chart, params.chartId]);

	return { chart, chartId: params.chartId };
}
