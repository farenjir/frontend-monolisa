import { useCallback, useState } from "react";
import type { Layout, Layouts } from "react-grid-layout";
import { Responsive, WidthProvider } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import SCard from "./components/sc";

const ResponsiveGridLayout = WidthProvider(Responsive);

const staticLayout = Array(25)
	.fill(null)
	.map((_, idx) => ({ i: `static${idx + 1}`, x: 0, y: 0, w: 1, h: 4, static: true }));

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
		minH: idx ? undefined : 4,
		isBounded: !!idx,
		isResizable: !!idx,
		isDraggable: !!idx,
		resizeHandles: ["s"],
		// moved
		static: !idx,
	}));

const defaultLayout: Layouts["lg"] = [...staticLayout, ...farshidLayout];

const ExampleLayout = () => {
	const [layout, setLayout] = useState(defaultLayout);

	const onDragStop = useCallback((layout: Layout[], oldItem: Layout, newItem: Layout) => {
		const itemIndex = layout.findIndex((item) => item.i === oldItem.i);
		if (oldItem.x !== newItem.x) {
			newItem.x = oldItem.x;
		}
		layout.splice(itemIndex, 1, newItem);
		setLayout(layout);
		// const itemIndex = layout.findIndex((item) => item.i === oldItem.i);
		// const perLayout = [...layouts.lg];
		// if (oldItem.x !== newItem.x) {
		// 	newItem.x = oldItem.x;
		// }
		// perLayout.splice(itemIndex, 1, newItem);
		// setLayouts({ lg: perLayout });
	}, []);

	const handleAddSlot = (person: string, columnIndex: number) => {
		const newSlot: Layout = {
			i: `${person}-${Date.now()}`,
			x: 1,
			y: 1,
			w: 2,
			h: 4,
			minW: 2,
			maxW: 2,
			maxH: columnIndex ? undefined : 4,
			minH: columnIndex ? undefined : 4,
			isBounded: !!columnIndex,
			isResizable: !!columnIndex,
			isDraggable: !!columnIndex,
			resizeHandles: ["s"],
		};
		setLayout((prev) => [...prev, newSlot]);
	};

	const people = ["date", "farshid"];
	return (
		<>
			<div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
				{people.map(
					(person, index) =>
						!!index && (
							<button key={person} onClick={() => handleAddSlot(person, index)}>
								Add Slot for {person}
							</button>
						),
				)}
			</div>
			<ResponsiveGridLayout
				compactType={null}
				preventCollision={true}
				useCSSTransforms={true}
				autoSize={true}
				isDroppable={false}
				rowHeight={16}
				cols={{ lg: 12, md: 9, sm: 6, xs: 3, xxs: 3 }}
				layouts={{ lg: layout }}
				draggableHandle=".layout-draggableHandle"
				onDragStop={onDragStop}
			>
				{layout.map(({ i, isDraggable }) => (
					<div
						key={i}
						style={{
							border: "1px dashed gray",
							display: "flex",
							flexFlow: "column",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<SCard isDraggable={isDraggable} />
					</div>
				))}
			</ResponsiveGridLayout>
		</>
	);
};

export default ExampleLayout;
