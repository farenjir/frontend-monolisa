import { Button, Flex, Typography } from "antd";
import { UserSwitchOutlined } from "@ant-design/icons";

import ServiceTableList from "./components/ServiceTableList";
import AddNewService from "./components/AddNewService";
import { useState } from "react";

const { Title, Text } = Typography;

export default function AdminServices() {
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
						Manage services
					</Title>
					<Text>This is the list of all services</Text>
				</Flex>
				<Flex gap={8}>
					<AddNewService {...{ showDrawer, onClose, open }} />
					<Button color="primary" variant="dashed" icon={<UserSwitchOutlined />}>
						Assign Service to Personnel
					</Button>
				</Flex>
			</Flex>
			<ServiceTableList {...{showDrawer}}/>
		</Flex>
	);
}
