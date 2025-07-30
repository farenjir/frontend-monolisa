import { Col, Flex, Row, theme, Typography } from "antd";

import CategoryCard from "./components/ServiceTableList";

const { Title, Text } = Typography;

const Categories = [
	{
		title: "Hair Services",
		description: "This is the description",
	},
	{
		title: "Facial Services",
		description: "This is the description",
	},
	{
		title: "Nail Services",
		description: "This is the description",
	},
	{
		title: "Makeup & Beauty",
		description: "This is the description",
	},
	{
		title: "Care & Therapy Treatments",
		description: "This is the description",
	},
];
export default function AdminCategories() {
	const { token } = theme.useToken();

	return (
		<Flex vertical>
			<Flex justify="space-between" align="end" style={{ marginBottom: "20px" }}>
				<Flex vertical gap={8}>
					<Title level={4} style={{ margin: 0, padding: 0 }}>
						Manage categories
					</Title>
					<Text>This is the list of all categories</Text>
				</Flex>
			</Flex>
			<Row gutter={[8, 8]}>
				{Categories.map((item) => (
					<Col span={8} key={item.title}>
						<CategoryCard color={token.colorPrimary} {...item} />
					</Col>
				))}
			</Row>
		</Flex>
	);
}
