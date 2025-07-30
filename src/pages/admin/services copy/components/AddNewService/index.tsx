import { InfoCircleOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Form, Input, InputNumber, Row, Select, Space, theme, Tooltip } from "antd";

const { Option } = Select;

const selectAfter = (
	<Select defaultValue="EUR" style={{ width: 60 }}>
		<Option value="USD">$</Option>
		<Option value="EUR">€</Option>
		<Option value="GBP">£</Option>
		<Option value="CNY">¥</Option>
	</Select>
);

const AddNewService = ({ onClose, showDrawer, open }: any) => {
	const { token } = theme.useToken();
	return (
		<>
			<Button type="primary" icon={<PlusOutlined />} onClick={showDrawer}>
				Add New Service
			</Button>
			<Drawer
				maskClosable={false}
				title="Create a new service"
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
				<Form layout="vertical">
					<Row gutter={8}>
						<Col span={24}>
							<Form.Item
								style={{ width: "50%" }}
								name="name"
								label="Default Name"
								rules={[{ required: true, message: "this field is required" }]}
							>
								<Input
									placeholder="this field is required"
									addonAfter={
										<Tooltip title="Fill in the details to add a new service.">
											<InfoCircleOutlined style={{ color: token.colorPrimary }} />
										</Tooltip>
									}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name="name" label="Name" rules={[{ required: true, message: "this field is required" }]}>
								<Input placeholder="Please enter Deutsch name" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name="Description"
								label="Description"
								rules={[{ required: true, message: "this field is required" }]}
							>
								<Input placeholder="Description" />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.List name="users">
								{(fields, { add, remove }) => (
									<>
										{fields.map(({ key, name, ...restField }) => (
											<Row align="stretch" gutter={8} key={key}>
												<Col span={7}>
													<Form.Item
														{...restField}
														name={[name, "owner"]}
														rules={[{ required: true, message: "this field is required" }]}
													>
														<Select defaultValue={"English"} placeholder="Please select an language">
															<Option value="English">English</Option>
															<Option value="Russian">Russian</Option>
														</Select>
													</Form.Item>
												</Col>
												<Col span={8}>
													<Form.Item
														{...restField}
														name={[name, "first"]}
														rules={[{ required: true, message: "this field is required" }]}
													>
														<Input placeholder="Please enter name" />
													</Form.Item>
												</Col>
												<Col span={8}>
													<Form.Item
														{...restField}
														name={[name, "last"]}
														rules={[{ required: true, message: "this field is required" }]}
													>
														<Input placeholder="Description" />
													</Form.Item>
												</Col>
												<Col span={1} style={{ paddingTop: "5px" }}>
													<MinusCircleOutlined onClick={() => remove(name)} />
												</Col>
											</Row>
										))}
										<Form.Item>
											<Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
												Add Translations Name
											</Button>
										</Form.Item>
									</>
								)}
							</Form.List>
						</Col>
					</Row>
					<Row gutter={8}>
						<Col span={8}>
							<Form.Item
								name="Top Master"
								label="Top Master"
								rules={[{ required: true, message: "this field is required" }]}
							>
								<InputNumber addonAfter={selectAfter} defaultValue={100} />
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item
								name="Master"
								label="Master"
								rules={[{ required: true, message: "this field is required" }]}
							>
								<InputNumber addonAfter={selectAfter} defaultValue={100} />
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item
								name="Junior Master"
								label="Junior Master"
								rules={[{ required: true, message: "this field is required" }]}
							>
								<InputNumber addonAfter={selectAfter} defaultValue={100} />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item
								name="description"
								label="Description"
								rules={[
									{
										required: true,
										message: "please enter url description",
									},
								]}
							>
								<Input.TextArea rows={4} placeholder="please enter service description" />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Drawer>
		</>
	);
};

export default AddNewService;
