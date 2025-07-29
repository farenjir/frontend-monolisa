import { EuroOutlined } from "@ant-design/icons";
import { Card, Col, Progress, Row, Statistic, theme } from "antd";

import DashboardChart from "./components/DashboardChart";
import { useViewportSize } from "@mantine/hooks";

const date = new Date();
const hours = date.getHours();
const day = date.getDay();
const month = date.getMonth();

export default function AdminDashboard() {
	const { height } = useViewportSize();
	const { token } = theme.useToken();
	return (
		<>
			<Row gutter={16}>
				<Col span={8}>
					<Card hoverable style={{ border: `1px solid ${token.colorPrimary}` }}>
						<Statistic
							title="Daily Sales"
							value={112893}
							suffix={<EuroOutlined style={{ color: token.colorPrimary, fontSize: "20px" }} />}
						/>
						<Progress
							size={[365, 30]}
							percent={100}
							success={{ percent: hours * 4.2 }}
							status="active"
							strokeColor={token.green2}
							showInfo={false}
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card hoverable style={{ border: `1px solid ${token.colorPrimary}` }}>
						<Statistic
							title="Monthly Sales"
							value={112893}
							suffix={<EuroOutlined style={{ color: token.colorPrimary, fontSize: "20px" }} />}
						/>
						<Progress steps={30} size={[10.2, 30]} status="active" percent={day * 3.3} showInfo={false} />
					</Card>
				</Col>
				<Col span={8}>
					<Card hoverable style={{ border: `1px solid ${token.colorPrimary}` }}>
						<Statistic
							title="Yearly Sales"
							value={112893}
							suffix={<EuroOutlined style={{ color: token.colorPrimary, fontSize: "20px" }} />}
						/>
						<Progress
							steps={12}
							size={[28, 30]}
							status="active"
							percent={month * 8.34}
							showInfo={false}
							strokeColor={token["orange-5"]}
						/>
					</Card>
				</Col>
				<Col span={24} style={{ height: height - 260, paddingTop: "20px", overflow: "hidden" }}>
					<DashboardChart chartData={[{ name: 1, value: 1 }]} />
				</Col>
			</Row>
		</>
	);
}
