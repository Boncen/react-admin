/* eslint-disable react/jsx-no-undef */
import { IconClear, IconTickCircle } from "@douyinfe/semi-icons";
import {
  Button,
  ButtonGroup,
  Card,
  Form,
  Modal,
  Popconfirm,
  Table,
  Tag,
  Toast,
} from "@douyinfe/semi-ui";
import { Pagination } from "@douyinfe/semi-ui/lib/es/table";
import { SetStateAction, useMemo, useState } from "react";
import { MenuPermissionModal } from "./menuPermissionModal";
import { Value } from "@douyinfe/semi-ui/lib/es/tree";

export function RoleList() {
  const [, setSelectedKeys] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [permissions, setPermissions] = useState<Value | undefined>();
  const [focusingRole, setFocusingRole] = useState();

  const columns = useMemo(
    () => [
      {
        title: "名称",
        dataIndex: "name",
      },
      {
        title: "状态",
        dataIndex: "status",
        render: (text: string | number) => {
          const tagConfig: any = {
            success: {
              color: "green",
              prefixIcon: <IconTickCircle />,
              text: "正常",
            },
            pending: {
              color: "red",
              prefixIcon: <IconClear />,
              text: "禁用",
            },
          };
          const tagProps = tagConfig[text];
          return (
            <>
              {tagProps ? (
                <Tag
                  shape="circle"
                  {...tagProps}
                  style={{ userSelect: "text" }}
                >
                  {tagProps.text}
                </Tag>
              ) : null}
            </>
          );
        },
      },
      {
        title: "备注",
        dataIndex: "remark",
      },
      {
        title: "更新日期",
        dataIndex: "updateTime",
      },
      {
        title: "",
        dataIndex: "operate",
        render: (_: any, record: any) => {
          function onClickSettingPermission(record: any): void {
            console.log(record);
            setShowModal(true);
            setFocusingRole(record.id);
          }

          return (
            <div>
              <ButtonGroup>
                <Popconfirm
                  title={`确定删除${record.name}？`}
                  content="此修改将不可逆"
                  onConfirm={() => {
                    Toast.success("delete " + record.name);
                  }}
                >
                  <Button type="danger" theme="borderless" size={"small"}>
                    删除
                  </Button>
                </Popconfirm>
                <Button theme="borderless" size={"small"}>
                  启用
                </Button>
                <Button theme="borderless" size={"small"}>
                  冻结
                </Button>
                <Button
                  theme="borderless"
                  size={"small"}
                  onClick={() => onClickSettingPermission(record)}
                >
                  设置菜单权限
                </Button>
              </ButtonGroup>
            </div>
          );
        },
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        id: "1",
        name: "管理员",
        status: "success",
        remark: "admin",
        updateTime: "2020-02-02 05:13",
      },
      {
        id: "2",
        name: "开发者",
        status: "success",
        remark: "developer",
        updateTime: "2020-02-02 05:13",
      },
      {
        id: "3",
        name: "客服",
        status: "success",
        remark: "",
        updateTime: "2020-02-02 05:13",
      },
      {
        id: "4",
        name: "运营",
        status: "pending",
        remark: "",
        updateTime: "2020-02-02 05:13",
      },
    ],
    []
  );

  const rowSelection: any = {
    getCheckboxProps: (record: { name: string }) => ({
      // disabled: record.name === "设计文档",
      name: record.name,
    }),
    onSelect: (record: any, selected: any) => {
      console.log(`select row: ${selected}`, record);
    },
    onSelectAll: (selected: any, selectedRows: any) => {
      console.log(`select all rows: ${selected}`, selectedRows);
    },
    onChange: (selectedRowKeys: SetStateAction<never[]>, selectedRows: any) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedKeys(selectedRowKeys);
    },
  };

  const pagination: Pagination = useMemo(
    () => ({
      pageSize: 20,
    }),
    []
  );

  /**斑马条纹 */
  const handleRow = (_: any, index: number | undefined) => {
    if (index != undefined && index % 2 === 0) {
      return {
        style: {
          background: "var(--semi-color-fill-0)",
        },
      };
    } else {
      return {};
    }
  };

  const handleModalOk = () => {
    Toast.success(focusingRole + "-" + JSON.stringify(permissions));
    setShowModal(false);
  };
  function handlePermissionChange(value?: Value | undefined): void {
    console.log("tree:", value);
    setPermissions(value);
  }

  return (
    <>
      <Card className="mb-1">
        <Form
          layout="horizontal"
          labelPosition={"left"}
          onSubmit={(values) => Toast.success(JSON.stringify(values))}
        >
          <Form.Input
            field="keyword"
            label="关键词搜索"
            style={{ width: 180 }}
          />

          <ButtonGroup>
            <Button
              type="primary"
              htmlType="submit"
              className="btn-margin-right"
            >
              提交
            </Button>
            <Button theme={"outline"} htmlType="reset">
              重置
            </Button>
          </ButtonGroup>
        </Form>
      </Card>
      <Card>
        <Table
          rowKey={"id"}
          size={"small"}
          columns={columns}
          dataSource={data}
          onRow={handleRow}
          rowSelection={rowSelection}
          pagination={pagination}
        />
      </Card>
      <Modal
        header={null}
        visible={showModal}
        onOk={handleModalOk}
        onCancel={() => setShowModal(false)}
      >
        <MenuPermissionModal onChange={handlePermissionChange} />
      </Modal>
    </>
  );
}
