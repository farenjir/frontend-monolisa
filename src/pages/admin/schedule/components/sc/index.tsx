import { DragOutlined } from "@ant-design/icons";

const SCard = ({ isDraggable = false }) => {
	return <>{isDraggable && <DragOutlined key="layout-draggableHandle" className="layout-draggableHandle" />}</>;
};

export default SCard;
