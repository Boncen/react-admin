import { MenuType } from "@/types/enum";
import { IconClear, IconTickCircle } from "@douyinfe/semi-icons";
import {
  Button,
  ButtonGroup,
  Card,
  Form,
  Popconfirm,
  Table,
  Tag,
  Toast,
} from "@douyinfe/semi-ui";
import { Pagination } from "@douyinfe/semi-ui/lib/es/table";
import { SetStateAction, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export function Menus() {
  const [, setSelectedKeys] = useState([]);
  const { t } = useTranslation();
  const columns = useMemo(
    () => [
      {
        title: "名称",
        dataIndex: "name",
      },
      {
        title: "路径",
        dataIndex: "path",
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
        title: "图标",
        dataIndex: "icon",
      },
      {
        title: "排序",
        dataIndex: "order",
      },
      {
        title: "类型",
        dataIndex: "menuType",
        render: (text: string | number) => {
          return (
            <>
              {text == MenuType.BUTTON ? (
                <Tag shape="circle" color={'cyan'}>按钮</Tag>
              ) : text == MenuType.PAGE ? (
                <Tag shape="circle" color={'purple'}>页面</Tag>
              ) : (
                <Tag shape="circle">父级菜单</Tag>
              )}
            </>
          );
        },
      },
      {
        title: "区域语言",
        dataIndex: "locale",
      },
      {
        title: "区域语言",
        dataIndex: "locale",
        render: (text: string) => {
            return t(text);
        }
      },
      {
        title: "",
        dataIndex: "operate",
        render: (_: any, record: any) => {
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
        id: "100001",
        parentId: "",
        path: "/system",
        name: "system",
        icon: "",
        order: 0,
        menuType: 3,
        locale: "menu.system",
        status: "success",
        children: [
          {
            id: "100002",
            parentId: "100001",
            path: "users",
            name: "users",
            icon: "",
            order: 1,
            menuType: 1,
            locale: "menu.users",
            status: "success",
          },
          {
            id: "100003",
            parentId: "100001",
            path: "roles",
            name: "roles",
            icon: "",
            order: 1,
            menuType: 1,
            locale: "menu.roles",
            status: "success",
          },
          {
            id: "100004",
            parentId: "100001",
            path: "menus",
            name: "menus",
            icon: "",
            order: 1,
            menuType: 1,
            locale: "menu.menus",
            status: "success",
          },
          {
            id: "100005",
            parentId: "100001",
            path: "logs",
            name: "logs",
            icon: "",
            order: 1,
            menuType: 1,
            locale: "menu.logs",
            status: "success",
          },
        ],
      },
      
    ],
    []
  );

  const rowSelection: any = {
    getCheckboxProps: (record: any) => ({
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
    </>
  );
}
