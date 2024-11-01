import api from "@/api";
import useUserStore from "@/store/userStore";
import { Form, Button, Toast } from "@douyinfe/semi-ui";
import { useEffect, useRef, useState } from "react";
export function Profile() {
  const { Section, Input, Select } = Form;
  const style = { width: "90%" };
  const [roles, setRoles] = useState([]);
  const [state, setState] = useState({
    name: "",
    mobile: "",
    roles: [],
  });
  const userStore = useUserStore();
  const formapi = useRef<any>();

  useEffect(() => {
    api.getRoleList({ pageIndex: 1, pageSize: 100 }).then((x) => {
      setRoles(x);
    });
    api.getUserInfo().then((info) => {
      const _info = {
        ...state,
        name: info.username,
        mobile: info.mobile,
        roles: info.roles,
      };
      setState(_info);
      formapi.current.setValues(_info);
    });
  }, []);

  function handleSubmitForm(v: any): void {
    // api.updateUserInfo(v).then(() => { Toast.success('success') })
    Toast.success(JSON.stringify(v));
    userStore.actions.setUserInfo({
      ...userStore.userInfo,
      username: v.name,
      mobile: v.mobile,
      roles: v.roles
    })
  }

  return (
    <div className="flex justify-center">
      <Form
      className="w-3/5"
        labelPosition={"left"}
        labelAlign={"left"}
        labelWidth={100}
        getFormApi={(formApi) => (formapi.current = formApi)}
        onSubmit={(v) => handleSubmitForm(v)}
        // onValueChange={(v) => console.log(v)}
      >
        <Section text={"基本信息"}>
              <Input
                field="name"
                label="名称"
                style={style}
                trigger="blur"
                initValue={state.name}
                rules={[
                    {required: true, message: '请输入名称'}
                ]}
              />
              <Input
                field="mobile"
                label="手机号"
                style={style}
                placeholder=""
                rules={[
                    {required: true, message: '请输入手机号'}
                ]}
              />
              <Select
                field="roles"
                style={style}
                label="角色"
                multiple={true}
                placeholder="请选择你的角色"
              >
                {roles.map((role: any) => (
                  <Select.Option key={role.id} value={role.id}>
                    {role.name}
                  </Select.Option>
                ))}
              </Select>
        </Section>
        <Button type="primary" htmlType="submit" className="btn-margin-right">
          提交(submit)
        </Button>
        {/* <Button htmlType="reset">重置(reset)</Button> */}
      </Form>
    </div>
  );
}
