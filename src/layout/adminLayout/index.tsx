import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { useViewportSize } from "@mantine/hooks";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
	PieChartOutlined,
	CalendarOutlined,
	ToolOutlined,
	AppstoreOutlined,
	BankOutlined,
	TeamOutlined,
	ScheduleOutlined,
	SolutionOutlined,
	UsergroupAddOutlined,
} from "@ant-design/icons";

import SettingDrawerWithIcon from "@/components/setting";
import { ROUTES_PATH } from "@/constants/routes";

const { Header, Content, Sider } = Layout;
const { ADMIN } = ROUTES_PATH;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: string, path: string, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
	return {
		key: path,
		icon,
		children,
		label,
	} as MenuItem;
}

const items: MenuItem[] = [
	getItem("Dashboard", ADMIN.DASHBOARD, <PieChartOutlined />),
	getItem("Schedule", ADMIN.SCHEDULE, <CalendarOutlined />),
	getItem("Services", ADMIN.SERVICES, <ToolOutlined />),
	getItem("Categories", "4", <AppstoreOutlined />),
	getItem("Branches", "5", <BankOutlined />),
	getItem("Add Personnel", "6-1", <TeamOutlined />),
	getItem("Personnel List", "6-2", <TeamOutlined />),
	getItem("Add Work Schedule", "7", <ScheduleOutlined />),
	getItem("Add Job Title", "8", <SolutionOutlined />),
	getItem("Seats", "9", <UsergroupAddOutlined />, [
		getItem("Add Seats", "9-1", <UsergroupAddOutlined />),
		getItem("Seats List", "9-2", <UsergroupAddOutlined />),
	]),
];

export default function AdminLayout() {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { height } = useViewportSize();
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer, borderRadiusLG, colorPrimary },
	} = theme.useToken();

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
				<div className="demo-logo-vertical" style={{ height: "40px" }} />
				<Menu
					theme="dark"
					selectedKeys={pathname.split("/")}
					mode="inline"
					items={items.slice(0,3)}
					onClick={({ key }) => {
						navigate(key);
					}}
				/>
			</Sider>
			<Layout>
				<Header
					style={{
						background: colorBgContainer,
						height: "40px",
						display: "flex",
						justifyContent: "end",
						alignItems: "center",
						padding: "0px 25px",
					}}
				>
					<SettingDrawerWithIcon />
				</Header>
				<Content style={{ margin: "15px" }}>
					<div
						style={{
							padding: 16,
							height: height - 70,
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
							border: `1px solid ${colorPrimary}`,
							overflow: "auto",
						}}
					>
						<Outlet key="admin-layout" />
					</div>
				</Content>
			</Layout>
		</Layout>
	);
}
