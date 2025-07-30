import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Row } from "antd";

import { useState } from "react";
import { Button, Modal } from "antd";
import { Checkbox, Divider } from "antd";
import type { CheckboxProps } from "antd";

const { Meta } = Card;

const plainOptions = Array(20)
	.fill("Hair Services")
	.map((name, idx) => `${name} ${idx > 9 ? idx : `0${idx}`}`);

const defaultCheckedList = plainOptions.slice(6, 14);

const Checkboxes = () => {
	const [checkedList, setCheckedList] = useState<string[]>(defaultCheckedList);

	const checkAll = plainOptions.length === checkedList.length;
	const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

	const onChange = (list: string[]) => {
		setCheckedList(list);
	};

	const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
		setCheckedList(e.target.checked ? plainOptions : []);
	};

	return (
		<>
			<Checkbox style={{ marginTop: "10px" }} indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
				Check all
			</Checkbox>
			<Divider style={{ margin: "10px 0px" }} />
			<Checkbox.Group value={checkedList} style={{ width: "100%", marginBottom: "10px" }} onChange={onChange}>
				<Row gutter={[16, 16]}>
					{plainOptions.map((name) => (
						<Col span={8} key={name}>
							<Checkbox value={name}>{name}</Checkbox>
						</Col>
					))}
				</Row>
			</Checkbox.Group>
			<Divider style={{ margin: "10px 0px" }} />
		</>
	);
};

const App = ({ open, handleCancel, setOpen }: any) => {
	const [loading, setLoading] = useState(false);

	const handleOk = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setOpen(false);
		}, 2000);
	};

	return (
		<>
			<Modal
				open={open}
				title="Edit available services"
				onOk={handleOk}
				onCancel={handleCancel}
				maskClosable={!loading}
				footer={[
					<Button key="back" onClick={handleCancel} disabled={loading}> 
						Cancel
					</Button>,
					<Button color="primary" variant="dashed" loading={loading} onClick={handleOk}>
						Add new service
					</Button>,
					<Button key="submit" type="primary" loading={loading} onClick={handleOk}>
						Save Changes
					</Button>,
				]}
			>
				<Checkboxes />
			</Modal>
		</>
	);
};

const CategoryCard = ({ color = "", title, description }: any) => {
	const [open, setOpen] = useState(false);
	const showModal = () => {
		setOpen(true);
	};
	const handleCancel = () => {
		setOpen(false);
	};
	return (
		<>
			<App {...{ open, handleCancel, setOpen }} />
			<Card
				style={{ border: `1px dotted ${color}` }}
				hoverable
				cover={
					<img height={130} alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
				}
				actions={[
					<SettingOutlined key="setting" onClick={showModal} />,
					<EditOutlined key="edit" onClick={showModal}/>,
					<EllipsisOutlined key="ellipsis" onClick={showModal}/>,
				]}
			>
				<Meta
					avatar={<Avatar src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
					title={title}
					description={description}
				/>
			</Card>
		</>
	);
};

export default CategoryCard;

// <Switch
//     checkedChildren={<CheckOutlined />}
//     unCheckedChildren={<CloseOutlined />}
//     defaultChecked
//   />
