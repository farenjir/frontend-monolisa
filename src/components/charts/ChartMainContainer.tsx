import { useResizeObserver } from "@mantine/hooks";
import type { EChartsType } from "echarts";
import type { PropsWithChildren } from "react";
import { memo, useEffect } from "react";

export type Props = {
	id: string;
	chart?: EChartsType;
	className?: string;
	isFullScreen?: boolean;
} & PropsWithChildren;
function ChartMainContainer(props: Props) {
	const [ref, rect] = useResizeObserver();
	useEffect(() => {
		props.chart?.resize();
	}, [props.chart, rect, props.isFullScreen]);
	return (
		<div style={{ width: "100%", height: "100%" }} id={props.id} ref={ref} className={props.className}>
			{props.children}
		</div>
	);
}

export default memo(ChartMainContainer);
