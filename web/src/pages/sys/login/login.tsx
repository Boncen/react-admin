import { useEffect, useState } from "react";
import "./login.less";
import { Form, Button, Card, Notification } from "@douyinfe/semi-ui";
import { useRouter } from "@/router/hook";
import PageMapper from "@/utils/page-mapper";
import { useUserActions } from "@/store/userStore";
import { useDarkMode } from "@/store/settingsStore";
import { changeTheme } from "@/router/utils";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useRouter();
  const { setUserToken } = useUserActions();
  const isDark = useDarkMode();

  useEffect(() => {
    changeTheme(isDark);
  });

  const handleSubmit = () => {
    console.log(username, password);
    if (username === "admin" && password === "admin") {
      setUserToken("1234567890");
      Notification.success({
        title: "登录成功",
        duration: 3,
      });
      push(PageMapper.Home);
    } else {
      Notification.error({
        title: "登录失败",
        content: "用户名或密码错误",
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
        title="欢迎使用"
      >
        <Form onSubmit={handleSubmit}>
          <Form.Input
            field="UserName"
            label="用户名"
            onChange={(value) => setUsername(value)}
            trigger="blur"
            rules={[{ required: true, message: "请输入用户名" }]}
          />
          <Form.Input
            field="Password"
            label={{
              text: "密码",
            }}
            mode="password"
            onChange={(value) => setPassword(value)}
            trigger="blur"
            rules={[
              { required: true, message: "请输入密码" },
              {
                validator: (_, value) => value?.length >= 5,
                message: "密码长度不够",
              },
            ]}
          />

          <Button block htmlType="submit" onSubmit={handleSubmit}>
            登录
          </Button>
        </Form>
      </Card>
      {/* </div> */}
    </div>
  );
}
