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
import { useMemo } from "react";

export function LogList() {
  const columns = useMemo(
    () => [
      {
        title: "endpoint",
        dataIndex: "endpoint",
      },
      {
        title: "时间",
        dataIndex: "datetime",
      },
      {
        title: "类型",
        dataIndex: "type",
        render: (text: string | number) => {
          return (
            <>
              {text == 1 ? (
                <Tag shape="circle" color={'red'}>异常</Tag>
              ) :(
                <Tag shape="circle">其它</Tag>
              )}
            </>
          );
        },
      },
      {
        title: "请求方式",
        dataIndex: "method",
      },
      {
        title: "agent",
        dataIndex: "agent",
      },
      {
        title: "ip",
        dataIndex: "ip",
      },
      {
        title: "详细信息",
        dataIndex: "detail",
      },
      {
        title: "",
        dataIndex: "operate",
        render: (_: any, record: any) => {
          return (
            <div>
              <ButtonGroup>
                <Popconfirm
                  title={`确定删除？`}
                  content="此修改将不可逆"
                  onConfirm={() => {
                    Toast.success("delete " + record.name);
                  }}
                >
                  <Button type="danger" theme="borderless" size={"small"}>
                    删除
                  </Button>
                </Popconfirm>
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
       
      
    ],
    []
  );


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
          <Form.DatePicker label="日期时间" field="datetime" type="dateTimeRange" format={'yyyy-MM-dd HH:mm:ss'} />

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
          pagination={pagination}
        />
      </Card>
    </>
  );
}
