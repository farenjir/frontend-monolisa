import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Col, Drawer, Radio, Row, Typography } from "antd";
import { APP_VERSION } from "@/constants/app";
import { SettingOutlined } from "@ant-design/icons";
import { useDisclosure } from "@mantine/hooks";
import { useAppContext } from "@/context";

const { Title } = Typography;

const SettingDrawerWithIcon = () => {
	const {
		language = "fa",
		tokens = {},
		themeMode = "default",
		fontMode = "default",
		selectedToken = "default",
		changeLanguage,
		changeTheme,
		changeFontMode,
		changeTokenMode,
	} = useAppContext();
	const [opened, handleDrawer] = useDisclosure();
	const { t } = useTranslation();
	const colors = useMemo(
		() =>
			Object.entries(tokens).map(([key, { colorPrimary }]) => ({
				style: { backgroundColor: colorPrimary },
				value: key,
			})),
		[tokens],
	);
	return (
		<>
			<SettingOutlined onClick={handleDrawer.open} style={{ fontSize: '20px' }}  />
			<Drawer open={opened} onClose={handleDrawer.close}>
				<Row gutter={[16, 16]}>
					<Title level={5}>{t("layouts.mode")}</Title>
					<Col span={24}>
						<Radio.Group
							buttonStyle="solid"
							defaultValue={themeMode}
							onChange={(e) => changeTheme(e.target.value)}
							optionType="button"
							options={[
								{
									label: t("layouts.light"),
									value: "default",
								},
								{
									label: t("layouts.dark"),
									value: "dark",
								},
							]}
						/>
					</Col>
					<Title level={5}>{t("layouts.theme")}</Title>
					<Col span={24}>
						<Radio.Group
							value={selectedToken}
							buttonStyle="solid"
							onChange={(e) => changeTokenMode(e.target.value)}
							optionType="button"
							options={colors}
						/>
					</Col>
					<Title level={5}>{t("layouts.fontSize")}</Title>
					<Col span={24}>
						<Radio.Group
							buttonStyle="solid"
							defaultValue={fontMode}
							onChange={(e) => changeFontMode(e.target.value)}
							optionType="button"
							options={[
								{
									label: t("layouts.fontDefault"),
									value: "none",
								},
								{
									label: t("layouts.fontSmall"),
									value: "compact",
								},
							]}
						/>
					</Col>
					<Title level={5}>{t("layouts.language")}</Title>
					<Col span={24}>
						<Radio.Group
							value={language}
							onChange={(e) => changeLanguage(e.target.value)}
							optionType="button"
							buttonStyle="solid"
							options={[
								{
									label: "English",
									value: "en",
								},
								{
									label: "Deutsch",
									value: "de",
								},
							]}
						/>
					</Col>
					<Title level={5}>{t("layouts.version")}</Title>
					<Col span={24}>
						<Radio.Group
							buttonStyle="solid"
							defaultValue={"version"}
							optionType="button"
							options={[
								{
									label: APP_VERSION,
									value: "version",
								},
							]}
						/>
					</Col>
				</Row>
			</Drawer>
		</>
	);
};

export default SettingDrawerWithIcon;
