import { useCallback, useState } from "react";
import type { Layout, Layouts } from "react-grid-layout";
import { Responsive, WidthProvider } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import GridCardGenerator from "../GridCards";

const ResponsiveGridLayout = WidthProvider(Responsive);

const staticLayout = Array(25)
	.fill(null)
	.map((_, idx) => ({ i: `date${idx}`, x: 0, y: 0, w: 1, h: 4, isDraggable: false, isResizable: false }));

const farshidLayout: Layouts["lg"] = Array(2)
	.fill(null)
	.map((_, idx) => ({
		i: `farshid${idx + 1}`,
		x: 1,
		y: 0,
		w: 2,
		h: 4,
		minW: 2,
		maxW: 2,
		maxH: idx ? undefined : 4,
		minH: idx ? 2 : 4,
		isBounded: !!idx,
		isResizable: !!idx,
		isDraggable: !!idx,
		resizeHandles: ["s", "n"],
		// moved
		static: !idx,
	}));
const davidLayout: Layouts["lg"] = Array(2)
	.fill(null)
	.map((_, idx) => ({
		i: `david${idx + 1}`,
		x: 3,
		y: 0,
		w: 2,
		h: 4,
		minW: 2,
		maxW: 2,
		maxH: idx ? undefined : 4,
		minH: idx ? 2 : 4,
		isBounded: !!idx,
		isResizable: !!idx,
		isDraggable: !!idx,
		resizeHandles: ["s", "n"],
		// moved
		static: !idx,
	}));

const defaultLayout: Layouts["lg"] = [...staticLayout, ...farshidLayout, ...davidLayout];
// eslint-disable-next-line react-refresh/only-export-components
export const people = ["date", "farshid", "david"];

const GridLayout = () => {
	const [layout, setLayout] = useState(defaultLayout);

	const onDragStop = useCallback((layout: Layout[], oldItem: Layout, newItem: Layout) => {
		const itemIndex = layout.findIndex((item) => item.i === oldItem.i);
		if (oldItem.x !== newItem.x) {
			newItem.x = oldItem.x;
		}
		layout.splice(itemIndex, 1, newItem);
		setLayout(layout);
	}, []);

	const handleAddSlot = useCallback((person: string, columnIndex: number) => {
		const record = person === "david" ? davidLayout[1] : farshidLayout[1];
		const newSlot: Layout = {
			...record,
			i: `${person}-${Date.now()}`,
			// y: 1,
			// x: 1,
			// w: 2,
			// h: 4,
			// minW: 2,
			// maxW: 2,
			isBounded: !!columnIndex,
			isResizable: !!columnIndex,
			isDraggable: !!columnIndex,
		};
		setLayout((prev) => [...prev, newSlot]);
	}, []);

	return (
		<>
			<ResponsiveGridLayout
				compactType={null}
				preventCollision={true}
				useCSSTransforms={true}
				autoSize={false}
				isDroppable={false}
				rowHeight={16}
				cols={{ lg: 12, md: 9, sm: 9, xs: 9, xxs: 9 }}
				layouts={{ lg: layout }}
				draggableHandle=".layout-draggableHandle"
				onDragStop={onDragStop}
				// margin={[10,10]}
				// breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
				style={{ minWidth: "900px" }}
			>
				{layout.map(({ i, ...layout }, index) => (
					<div key={i} style={{ border: "1px dashed gray" }}>
						<GridCardGenerator
							handleAddSlot={(person) => handleAddSlot(person, index)}
							{...{ i, index, ...layout }}
						/>
					</div>
				))}
			</ResponsiveGridLayout>
		</>
	);
};

export default GridLayout;
