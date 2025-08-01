import { PlusOutlined } from "@ant-design/icons";
import { Drawer, Space } from "antd";
import { useState } from "react";
import type { CascaderProps } from "antd";
import { AutoComplete, Button, Cascader, Form, Input, InputNumber, Select } from "antd";

const { Option } = Select;

interface DataNodeType {
	value: string;
	label: string;
	children?: DataNodeType[];
}

const residences: CascaderProps<DataNodeType>["options"] = [
	{
		value: "zhejiang",
		label: "Zhejiang",
		children: [
			{
				value: "hangzhou",
				label: "Hangzhou",
				children: [
					{
						value: "xihu",
						label: "West Lake",
					},
				],
			},
		],
	},
	{
		value: "jiangsu",
		label: "Jiangsu",
		children: [
			{
				value: "nanjing",
				label: "Nanjing",
				children: [
					{
						value: "zhonghuamen",
						label: "Zhong Hua Men",
					},
				],
			},
		],
	},
];

const formItemLayout = {
	// labelCol: {
	// 	xs: { span: 24 },
	// 	sm: { span:  },
	// },
	// wrapperCol: {
	// 	xs: { span: 24 },
	// 	sm: { span: 20,offset:4 },
	// },
};

const App = () => {
	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		console.log("Received values of form: ", values);
	};

	const prefixSelector = (
		<Form.Item name="prefix" noStyle>
			<Select style={{ width: 70 }}>
				<Option value="86">+86</Option>
				<Option value="87">+87</Option>
			</Select>
		</Form.Item>
	);

	const suffixSelector = (
		<Form.Item name="suffix" noStyle>
			<Select style={{ width: 70 }}>
				<Option value="USD">$</Option>
				<Option value="CNY">¥</Option>
			</Select>
		</Form.Item>
	);

	const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

	const onWebsiteChange = (value: string) => {
		if (!value) {
			setAutoCompleteResult([]);
		} else {
			setAutoCompleteResult([".com", ".org", ".net"].map((domain) => `${value}${domain}`));
		}
	};

	const websiteOptions = autoCompleteResult.map((website) => ({
		label: website,
		value: website,
	}));

	return (
		<Form
			{...formItemLayout}
			form={form}
			name="register"
			onFinish={onFinish}
			initialValues={{ residence: ["zhejiang", "hangzhou", "xihu"], prefix: "86" }}
			scrollToFirstError
		>
			<Form.Item
				name="email"
				label="E-mail"
				rules={[
					{
						type: "email",
						message: "The input is not valid E-mail!",
					},
					{
						required: true,
						message: "Please input your E-mail!",
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name="password"
				label="Password"
				rules={[
					{
						required: true,
						message: "Please input your password!",
					},
				]}
				hasFeedback
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				name="confirm"
				label="Confirm Password"
				dependencies={["password"]}
				hasFeedback
				rules={[
					{
						required: true,
						message: "Please confirm your password!",
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue("password") === value) {
								return Promise.resolve();
							}
							return Promise.reject(new Error("The new password that you entered do not match!"));
						},
					}),
				]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				name="nickname"
				label="Nickname"
				tooltip="What do you want others to call you?"
				rules={[{ required: true, message: "Please input your nickname!", whitespace: true }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name="residence"
				label="Residence"
				rules={[{ type: "array", required: true, message: "Please select your habitual residence!" }]}
			>
				<Cascader options={residences} />
			</Form.Item>

			<Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: "Please input your phone number!" }]}>
				<Input addonBefore={prefixSelector} style={{ width: "100%" }} />
			</Form.Item>

			<Form.Item name="donation" label="Donation" rules={[{ required: true, message: "Please input donation amount!" }]}>
				<InputNumber addonAfter={suffixSelector} style={{ width: "100%" }} />
			</Form.Item>

			<Form.Item name="website" label="Website" rules={[{ required: true, message: "Please input website!" }]}>
				<AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
					<Input />
				</AutoComplete>
			</Form.Item>

			<Form.Item name="gender" label="Gender" rules={[{ required: true, message: "Please select gender!" }]}>
				<Select placeholder="select your gender">
					<Option value="male">Male</Option>
					<Option value="female">Female</Option>
					<Option value="other">Other</Option>
				</Select>
			</Form.Item>

			<Form.Item name="intro" label="Intro" rules={[{ required: true, message: "Please input Intro" }]}>
				<Input.TextArea showCount maxLength={100} />
			</Form.Item>
		</Form>
	);
};

const AddNewService = ({ onClose, showDrawer, open }: any) => {
	return (
		<>
			<Button type="primary" icon={<PlusOutlined />} onClick={showDrawer}>
				Add New Person
			</Button>
			<Drawer
				maskClosable={false}
				title="Create a new Person"
				width={"50%"}
				onClose={onClose}
				open={open}
				extra={
					<Space>
						<Button onClick={onClose}>Cancel</Button>
						<Button onClick={onClose} type="primary">
							Submit
						</Button>
					</Space>
				}
			>
				<App />
			</Drawer>
		</>
	);
};

export default AddNewService;
