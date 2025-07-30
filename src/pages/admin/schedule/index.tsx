import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Button, Space } from "antd";
import GridLayout from "./components/GridLayout";

import type { TabsProps } from "antd";
import { Tabs } from "antd";
import CalenderComponent from "./components/Calender";

const MotionDiv = motion.div;

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const defaultItems = [
	{
		label: "Today",
		key: "today",
		closable: false,
	},
	{
		label: "Tomorrow",
		key: "tomorrow",
		closable: false,
	},
];

export default function ZoomWithButtons() {
	const [scale, setScale] = useState(1);

	const zoomIn = () => {
		setScale((prev) => Math.min(prev + 0.1, 3));
	};

	const zoomOut = () => {
		setScale((prev) => Math.max(prev - 0.1, 0.5));
	};

	const [activeKey, setActiveKey] = useState("today");
	const [items, setItems] = useState<TabsProps["items"]>(defaultItems);

	const removeChild = useCallback(
		(keySelected: string) => {
			const updated = items?.concat({
				label: `New tab`,
				key: keySelected,
				children: null,
			});
			setItems(updated);
		},
		[items],
	);

	const add = () => {
		const newKey = String((items || []).length + 1);
		setItems([
			...(items || []),
			{
				label: `New tab`,
				key: newKey,
				children: <CalenderComponent removeChild={() => removeChild(newKey)} />,
			},
		]);
		setActiveKey(newKey);
	};

	const remove = (targetKey: TargetKey) => {
		if (!items) return;
		const targetIndex = items.findIndex((item) => item.key === targetKey);
		const newItems = items.filter((item) => item.key !== targetKey);

		if (newItems.length && targetKey === activeKey) {
			const newActiveKey = newItems[targetIndex === newItems.length ? targetIndex - 1 : targetIndex].key;
			setActiveKey(newActiveKey);
		}

		setItems(newItems);
	};

	const onEdit = (targetKey: TargetKey, action: "add" | "remove") => {
		if (action === "add") {
			add();
		} else {
			remove(targetKey);
		}
	};

	const itemsWithChild = items?.map((item) => ({
		...item,
		children: (
			<MotionDiv animate={{ scaleY: scale }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
				{item.children || <GridLayout />}
			</MotionDiv>
		),
	}));

	return (
		<Tabs
			type="editable-card"
			size="large"
			activeKey={activeKey}
			onChange={setActiveKey}
			onEdit={onEdit}
			items={itemsWithChild}
			tabBarExtraContent={{
				right: (
					<Space>
						<Button onClick={zoomOut} color="primary" variant="dashed">
							Zoom Out
						</Button>
						<Button onClick={zoomIn} color="primary" variant="dashed">
							Zoom In
						</Button>
						<div> Zoom: {scale.toFixed(1)}x</div>
					</Space>
				),
			}}
		/>
	);
}
