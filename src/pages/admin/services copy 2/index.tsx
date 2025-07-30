import { Flex, Typography } from "antd";

import ServiceTableList from "./components/ServiceTableList";
import AddNewService from "./components/AddNewService";
import { useState } from "react";

const { Title, Text } = Typography;

export default function AdminPersonnel() {
	const [open, setOpen] = useState(false);
	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};

	return (
		<Flex vertical>
			<Flex justify="space-between" align="end" style={{ marginBottom: "20px" }}>
				<Flex vertical gap={8}>
					<Title level={4} style={{ margin: 0, padding: 0 }}>
						Manage Personnel
					</Title>
					<Text>This is the list of all personnel</Text>
				</Flex>
				<Flex gap={8}>
					<AddNewService {...{ showDrawer, onClose, open }} />
				</Flex>
			</Flex>
			<ServiceTableList {...{ showDrawer }} />
		</Flex>
	);
}
