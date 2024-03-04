import { useEffect, useState } from "react";
import { Form, Button, Card, Notification } from "@douyinfe/semi-ui";
import { useRouter } from "@/router/hook";
import PageMapper from "@/utils/page-mapper";
import { useUserActions } from "@/store/userStore";
import { useDarkMode } from "@/store/settingsStore";
import { changeTheme } from "@/router/utils";
import { useTranslation } from "react-i18next";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useRouter();
  const { setUserToken } = useUserActions();
  const isDark = useDarkMode();
  const {t} = useTranslation();

  useEffect(() => {
    changeTheme(isDark);
  });

  const handleSubmit = () => {
    console.log(username, password);
    if (username === "admin" && password === "admin") {
      setUserToken("1234567890");
      Notification.success({
        title: t('sys.login.loginSuccessTitle'),
        duration: 3,
      });
      push(PageMapper.Home);
    } else {
      Notification.error({
        title: t('sys.api.errorTip'),
        content: t('AuthenticationFail'),
        duration: 3,
      });
    }
  };

  return (
    <div
      className="w-full h-screen	 justify-center items-center flex "
      style={{ background: " var( --semi-color-bg-0)" }}
    >
      {/* <div className=""> */}
      <Card
        className="w-1/5 min-w-64"
        shadows="hover"
        bordered={true}
        title={t('sys.login.signInPrimaryTitle')}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Input
            field="UserName"
            label={t('sys.menu.user.account')}
            onChange={(value) => setUsername(value)}
            trigger="blur"
            rules={[{ required: true, message: t('validation.needAccount') }]}
          />
          <Form.Input
            field="Password"
            label={{
              text: t('sys.login.password'),
            }}
            mode="password"
            onChange={(value) => setPassword(value)}
            trigger="blur"
            rules={[
              { required: true, message: t('validation.needPassword') },
              {
                validator: (_, value) => value?.length >= 5,
                message: t('validation.passwordLengthError'),
              },
            ]}
          />

          <Button block htmlType="submit" onSubmit={handleSubmit}>
            {t('sys.login.signInFormTitle')}
          </Button>
        </Form>
      </Card>
      {/* </div> */}
    </div>
  );
}
