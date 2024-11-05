/* eslint-disable react/jsx-no-undef */
import { UseRouter } from "@/hooks/useRouter";
import {
  IconClear,
  IconComment,
  IconHelpCircle,
  IconTickCircle,
} from "@douyinfe/semi-icons";
import {
  Button,
  ButtonGroup,
  Card,
  Form,
  Popconfirm,
  Table,
  Tag,
  Toast,
  Tooltip,
} from "@douyinfe/semi-ui";
import { Pagination } from "@douyinfe/semi-ui/lib/es/table";
import { SetStateAction, useMemo, useState } from "react";

export function UserList() {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const { push } = UseRouter();

  const columns = useMemo(
    () => [
      {
        title: "姓名",
        dataIndex: "name",
      },
      {
        title: "联系方式",
        dataIndex: "mobile",
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
              color: "pink",
              prefixIcon: <IconClear />,
              text: "冻结",
            },
            wait: {
              color: "cyan",
              prefixIcon: <IconComment />,
              text: "待评审",
            },
          };
          const tagProps = tagConfig[text];
          return (
            <Tag shape="circle" {...tagProps} style={{ userSelect: "text" }}>
              {tagProps.text}
            </Tag>
          );
        },
      },
      {
        title: "更新日期",
        dataIndex: "updateTime",
      },
      {
        title: "",
        dataIndex: "operate",
        render: (_: any, record: any) => {
          function onClickDetail(record: any): void {
            console.log(record);
            if (record) {
              push("userDetail", { id: record.id }, record.name);
            }
          }

          return (
            <div>
              <ButtonGroup>
                <Popconfirm
                  title={`确定删除${record.name}？`}
                  content="此修改将不可逆"
                  onConfirm={()=>{Toast.success('delete '+ record.name)}}
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
                  onClick={() => onClickDetail(record)}
                >
                  详细
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
        name: "张三",
        mobile: "17611047894",
        status: "success",
        updateTime: "2020-02-02 05:13",
      },
      {
        id: "2",
        name: "李四",
        mobile: "17611047895",
        status: "success",
        updateTime: "2020-02-02 05:13",
      },
      {
        id: "3",
        name: "王五",
        mobile: "17611047896",
        status: "pending",
        updateTime: "2020-02-02 05:13",
      },
      {
        id: "4",
        name: "赵六",
        mobile: "17611047897",
        status: "success",
        updateTime: "2020-02-02 05:13",
      },
    ],
    []
  );

  const rowSelection = {
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

  /**实现斑马条纹 */
  const handleRow = (record: any, index: number | undefined) => {
    // 给偶数行设置斑马纹
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
          <Form.Input field="name" label="用户名" style={{ width: 180 }} />
          <Form.Input
            field="mobile"
            label={{
              text: "手机号",
              extra: (
                <Tooltip content="详情">
                  <IconHelpCircle
                    style={{ color: "var(--semi-color-text-2)" }}
                  />
                </Tooltip>
              ),
            }}
            style={{ width: 176 }}
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
