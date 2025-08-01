import { useRef, useState } from "react";
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined, SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Flex, Input, Popconfirm, Space, Table, theme, Tooltip } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { useViewportSize } from "@mantine/hooks";

interface DataType {
	key: string;
	name: string;
	description: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = Array(200)
	.fill(null)
	.map((_, idx) => ({ key: `${idx + 1}`, description: `New York No. ${idx + 1} Lake Park`, name: `John ${idx + 1} Brown` }));

const ServiceTableList = ({ showDrawer }: any) => {
	const [searchText, setSearchText] = useState("");
	const [searchedColumn, setSearchedColumn] = useState("");

	const searchInput = useRef<InputRef>(null);
	const { height } = useViewportSize();
	const { token } = theme.useToken();

	const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps["confirm"], dataIndex: DataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = (clearFilters: () => void) => {
		clearFilters();
		setSearchText("");
	};

	const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
			<div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
					style={{ marginBottom: 8, display: "block" }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
						Reset
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							confirm({ closeDropdown: false });
							setSearchText((selectedKeys as string[])[0]);
							setSearchedColumn(dataIndex);
						}}
					>
						Filter
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							close();
						}}
					>
						close
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />,
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes((value as string).toLowerCase()),
		filterDropdownProps: {
			onOpenChange(open) {
				if (open) {
					setTimeout(() => searchInput.current?.select(), 100);
				}
			},
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ""}
				/>
			) : (
				text
			),
	});

	const columns: TableColumnsType<DataType> = [
		{
			title: "Service Name",
			dataIndex: "name",
			key: "name",
			...getColumnSearchProps("name"),
			sorter: (a, b) => a.name.length - b.name.length,
			sortDirections: ["descend", "ascend"],
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
			...getColumnSearchProps("description"),
		},
		{
			title: "Actions",
			dataIndex: "actions",
			key: "actions",
			width: "20%",
			render: () => (
				<Flex gap={20}>
					<Popconfirm
						okType="danger"
						title="Delete the service"
						description="Are you sure to delete this service?"
						icon={<QuestionCircleOutlined style={{ color: "red", fontSize: "15px" }} />}
					>
						<DeleteOutlined title="Delete" style={{ color: token["red-5"], fontSize: "20px" }} />
					</Popconfirm>
					<Tooltip title="Edit service configs">
						<EditOutlined
							title="Edit"
							style={{ color: token["orange-5"], fontSize: "20px", cursor: "pointer" }}
							onClick={showDrawer}
						/>
					</Tooltip>
				</Flex>
			),
		},
	];

	return <Table<DataType> columns={columns} dataSource={data} bordered scroll={{ y: height - 310 }} />;
};

export default ServiceTableList;
