import { Tree } from "@douyinfe/semi-ui";
import { Value } from "@douyinfe/semi-ui/lib/es/tree";

export function MenuPermissionModal({
  onChange,
}: {
  onChange: (value?: Value | undefined) => void;
}) {
  const treeData = [
    {
      label: "用户管理",
      value: "users",
      key: "0",
      children: [
        {
          label: "列表",
          value: "users.list",
          key: "0-0",
        },
        {
          label: "编辑",
          value: "users.edit",
          key: "0-1",
        },
        {
          label: "添加",
          value: "users.add",
          key: "0-2",
        },
        {
          label: "删除",
          value: "users.delete",
          key: "0-3",
        },
        {
          label: "导出",
          value: "users.export",
          key: "0-4",
        },
        {
          label: "导入",
          value: "users.import",
          key: "0-5",
        },
      ],
    },
    {
        label: "角色管理",
        value: "roles",
        key: "1",
        children: [
          {
            label: "列表",
            value: "roles.list",
            key: "1-0",
          },
          {
            label: "编辑",
            value: "roles.edit",
            key: "1-1",
          },
          {
            label: "添加",
            value: "roles.add",
            key: "1-2",
          },
          {
            label: "删除",
            value: "roles.delete",
            key: "1-3",
          },
          {
            label: "导出",
            value: "roles.export",
            key: "1-4",
          },
          {
            label: "导入",
            value: "roles.import",
            key: "1-5",
          },
        ],
      },
  ];
  return (
    <>
      <h3 style={{ textAlign: "center", fontSize: 24, margin: 40 }}>
        设置菜单权限
      </h3>
      <Tree
        treeData={treeData}
        multiple
        disableStrictly
        blockNode={true}
        onChange={onChange}
      />
    </>
  );
}
