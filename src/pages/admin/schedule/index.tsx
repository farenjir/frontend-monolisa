import type { Layouts } from "react-grid-layout";
import { Responsive, WidthProvider } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import "./assets/style.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const staticLayout = Array(25)
	.fill(null)
	.map((_, idx) => ({ i: `static${idx + 1}`, x: 0, y: 0, w: 1, h: 4, static: true }));

const farshidLayout: Layouts["lg"] = Array(25)
	.fill(null)
	.map((_, idx) => ({
		i: `farshid${idx + 1}`,
		x: 1,
		y: 1,
		w: 2,
		h: 4,
		minW: 2,
		maxW: 2,
		isDraggable: true,
		// static:!!idx,
		maxH: idx ? undefined : 4,
		minH: idx ? undefined : 4,
		isBounded: !!idx,
		isResizable: !!idx,
		resizeHandles: [idx ? "s" : "ne"],
		// moved
	}));

const ExampleLayout = () => {
	const layouts: Layouts = { lg: [...staticLayout, ...farshidLayout] };
	return (
		<ResponsiveGridLayout
			className="layout"
			compactType="vertical"
			autoSize={true}
			rowHeight={16}
			cols={{ lg: 12, md: 9, sm: 6, xs: 3, xxs: 3 }}
			layouts={layouts}
		>
			{layouts.lg.map((item) => (
				<div
					key={item.i}
					style={{ border: "1px dashed gray", display: "flex", justifyContent: "center", alignItems: "center" }}
				>
					{item.i}
				</div>
			))}
		</ResponsiveGridLayout>
	);
};

export default ExampleLayout;
