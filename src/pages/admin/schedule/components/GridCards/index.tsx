import { DragOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { people } from "../GridLayout";
import type { Layout } from "react-grid-layout";
import { Divider, Flex, theme, Tooltip } from "antd";

type Props = Layout & {
	index: number;
	handleAddSlot: (person: string) => void;
};

const DateCard = ({ index }: Props) => {
	return (
		!!index && (
			<Flex vertical gap={2} style={{ paddingTop: "8px" }}>
				<Divider orientation="right" plain dashed size="small" style={{ padding: 0, margin: 0 }}>
					{`${index > 9 ? index : `0${index}`}:15`}
				</Divider>
				<Divider orientation="right" plain dashed size="small" style={{ padding: 0, margin: 0 }}>
					{`${index > 9 ? index : `0${index}`}:30`}
				</Divider>
				<Divider orientation="right" plain dashed size="small" style={{ padding: 0, margin: 0 }}>
					{`${index > 9 ? index : `0${index}`}:45`}
				</Divider>
			</Flex>
		)
	);
};

const SCard = ({ i = "", isDraggable = false, handleAddSlot }: Props) => {
	const { token } = theme.useToken();
	const personName = people.find((name) => i.includes(name));
	return (
		<Flex vertical justify="space-between" style={{ padding: "10px" }}>
			{!isDraggable && personName && (
				<>
					<Flex justify="end">
						<Tooltip title={`Add new card for ${personName}`}>
							<AppstoreAddOutlined
								style={{ color: token.colorPrimary }}
								onClick={() => handleAddSlot(personName)}
							/>
						</Tooltip>
					</Flex>
					<Flex align="center" justify="center" style={{ textTransform: "capitalize" }}>
						{personName}
					</Flex>
				</>
			)}

			{isDraggable && (
				<Flex justify="end">
					<DragOutlined key="layout-draggableHandle" className="layout-draggableHandle cursor-pointer" />
				</Flex>
			)}
		</Flex>
	);
};

const GridCardGenerator = (props: Props) => {
	return <>{props.i.includes("date") ? <DateCard {...props} /> : <SCard {...props} />}</>;
};

export default GridCardGenerator;
