import { useEffect, useState } from "react";
import { Form, Button, Card, Notification } from "@douyinfe/semi-ui";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { useNavigate } from "react-router-dom";
import useSettingStore from "@/store/useSettingStore";
import style from "./index.module.less";
import useUserStore from "@/store/userStore";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const userStore = useUserStore();
  const setting = useSettingStore((state) => state.setting);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // changeTheme(isDark);
    i18n.changeLanguage(setting.lang ?? "");
  }, [i18n, setting.lang]);

  const handleSubmit = () => {
    api.getUserInfo().then((x) => {
      console.log("userinfo", x);
      userStore.actions.setUserInfo(x);
    });
    api
      .login({
        account: username,
        password: password,
      })
      .then((x: any) => {
        console.log('login result', x);
        
        userStore.actions.setUserToken(x.token);
        Notification.success({
          title: t("sys.login.loginSuccessTitle"),
          duration: 3,
        });

        navigate("/");
      }).catch((err)=> {
        Notification.error({
          title: err.message,
          duration: 3,
        });
      });
  };

  return (
    <div className={style.bg}>
      <Card
        className="w-1/4"
        shadows={"always"}
        bordered={true}
        title={t("sys.login.signInPrimaryTitle")}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Input
            field="UserName"
            label={t("sys.menu.user.account")}
            onChange={(value) => setUsername(value)}
            trigger="blur"
            rules={[{ required: true, message: t("validation.needAccount") }]}
          />
          <Form.Input
            field="Password"
            label={{
              text: t("sys.login.password"),
            }}
            mode="password"
            onChange={(value) => setPassword(value)}
            trigger="blur"
            rules={[
              { required: true, message: t("validation.needPassword") },
              {
                validator: (_, value) => value?.length >= 5,
                message: t("validation.passwordLengthError"),
              },
            ]}
          />

          <Button block htmlType="submit" onSubmit={handleSubmit}>
            {t("sys.login.signInFormTitle")}
          </Button>
        </Form>
      </Card>
    </div>
  );
}
