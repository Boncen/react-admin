import { IconBell, IconMinusCircle } from "@douyinfe/semi-icons";
import {
  Button,
  List,
  Pagination,
  Popconfirm,
  Popover,
  Space,
} from "@douyinfe/semi-ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function Notification() {
  return (
    <Popover trigger={"click"} content={<NotificationPopup />}>
      <Button
        theme="borderless"
        icon={<IconBell size="large" />}
        style={{
          color: "var(--semi-color-text-2)",
          marginRight: "12px",
        }}
      />
    </Popover>
  );
}

function NotificationPopup() {
  const [data, setData] = useState([
    "围城",
    "平凡的世界（全三册）",
    "三体（全集）",
    "雪中悍刀行（全集）",
    "撒哈拉的故事",
    "明朝那些事",
    "一禅小和尚",
    "沙丘",
    "被讨厌的勇气",
    "罪与罚",
    "月亮与六便士",
    "沉默的大多数",
  ]);
  const [page, onPageChange] = useState(1);
  const { t } = useTranslation();
  const pageSize = 7;
  const getData = (page: number) => {
    const start = (page - 1) * pageSize;
    const end = page * pageSize;
    return data.slice(start, end);
  };
  const onConfirm = () => {
    setData([]);
  };
  const updateList = (item: string) => {
    let newList;
    if (item) {
        newList = data.filter(i => item !== i);
    } else {
        newList = data.concat(data.slice(data.length, data.length + 1));
    }
    setData(newList);
};

  return (
    <div className="p-2 w-[300px]">
      <h2 className="text-[20px] p-2 font-bold">消息</h2>
      <Space>
        <Button size="small">全部已读</Button>
        <Popconfirm position={"bottomRight"} title={t("ifClearAllItem")} onConfirm={onConfirm}>
          <Button size="small" type="danger">
            清空
          </Button>
        </Popconfirm>
      </Space>
      <div className="mt-2">
        <List
          dataSource={getData(page)}
          split={true}
          renderItem={(item) => (
            <List.Item className="list-item">
               <Button type='danger' theme='borderless' icon={<IconMinusCircle />} onClick={() => updateList(item)} style={{ marginRight: 4 }} />
              {item}
              </List.Item>
          )}
        />
        <Pagination
          size="small"
          style={{ width: "100%", flexBasis: "100%", justifyContent: "center" }}
          pageSize={pageSize}
          total={data.length}
          currentPage={page}
          onChange={(cPage) => onPageChange(cPage)}
        />
      </div>
    </div>
  );
}
