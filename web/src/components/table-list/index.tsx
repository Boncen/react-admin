import { Button, Card, Collapsible, Table } from "@douyinfe/semi-ui";
import { ReactNode, useState } from "react";

interface TableListProps {
  columns: Array<{ title: string; dataIndex: string }>;
  data: Record<string, any>[];
  pagination: boolean;
  extraSearchForm?: ReactNode;
}

export default function TableList({
  columns,
  data,
  pagination,
  extraSearchForm,
}: TableListProps) {
  const handleSearchConfirm = () => {};
  const handleSearchReset = () => {};
  const [isOpen, setIsOpen] = useState(false);

  const renderSearchFormFooter = (): ReactNode => {
    return (
      <div className="flex flex-row-reverse	">
        <Button onClick={handleSearchReset}>重置</Button>
        <Button theme='solid' type={"primary"} onClick={handleSearchConfirm}>
          确定
        </Button>
      </div>
    );
  };

  return (
    <div>
      <Card className="m-2" shadows={"hover"} footer={renderSearchFormFooter()}>
        <div>
          <div>

          </div>
          <Collapsible isOpen={isOpen} duration={400}>
            {extraSearchForm}
          </Collapsible>
        </div>
      </Card>
      <Card shadows={"hover"} className="m-2">
        <Table
          className="m-1"
          columns={columns}
          dataSource={data}
          pagination={pagination}
        />
      </Card>
    </div>
  );
}
