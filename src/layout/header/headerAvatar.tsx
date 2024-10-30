import useUserStore from "@/store/userStore";
import { Avatar, Dropdown } from "@douyinfe/semi-ui";
import { DropDownMenuItem } from "@douyinfe/semi-ui/lib/es/dropdown";
import { useNavigate } from "react-router-dom";

export function HeaderAvatar() {
  const navigate = useNavigate();
  const userStore = useUserStore();
  function logout() {
    // clear userStore
    userStore.actions.clearUserInfoAndToken();
    navigate("/login");
  }

  const menu: DropDownMenuItem[] = [
    {
      node: "item",
      name: "个人信息",
      onClick: () => console.log("我的信息"),
    },
    { node: "divider" },
    { node: "item", name: "退出", type: "danger", onClick: () => logout() },
  ];
  return (
    <Dropdown trigger={"click"} showTick position={"bottomRight"} menu={menu}>
      <Avatar color="red" size="small">
        {userStore.userInfo?.username ?? 'Login'}
      </Avatar>
    </Dropdown>
  );
}

