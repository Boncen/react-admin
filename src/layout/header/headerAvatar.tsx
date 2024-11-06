import useUserStore from "@/store/userStore";
import { Avatar, Dropdown } from "@douyinfe/semi-ui";
import { DropDownMenuItem } from "@douyinfe/semi-ui/lib/es/dropdown";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function HeaderAvatar() {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const { t } = useTranslation();
  function logout() {
    console.log(userStore);
    
    userStore.clearUserInfoAndToken();
    navigate("/login");
  }

  const menu: DropDownMenuItem[] = [
    {
      node: "item",
      name: t("menu.userProfile"),
      onClick: () => navigate({ pathname: "system/user/profile" }),
    },
    { node: "divider" },
    { node: "item", name: t('ui.logout'), type: "danger", onClick: () => logout() },
  ];
  return (
    <Dropdown trigger={"click"} showTick position={"bottomRight"} menu={menu}>
      <Avatar color="red" size="small">
        {userStore.userInfo?.username ?? "Login"}
      </Avatar>
    </Dropdown>
  );
}
