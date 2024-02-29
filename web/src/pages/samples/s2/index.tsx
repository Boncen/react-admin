import { Form, Tooltip } from "@douyinfe/semi-ui";
import { IconHelpCircle } from '@douyinfe/semi-icons';


export default function Index(){
    const { Option } = Form.Select;
    
    return (
        <Form layout='horizontal' onValueChange={values=>console.log(values)}>
            <Form.Input field='UserName' label='用户名2' style={{ width: 80 }}/>
            <Form.Input
                field='Password'
                label={{ 
                    text: '密码2',
                    extra: <Tooltip content='详情'><IconHelpCircle style={{ color: 'var(--semi-color-text-2)' }}/></Tooltip> 
                }}
                style={{ width: 176 }}
            />
            <Form.Select field="Role" label={{ text: '角色', optional: true }} style={{ width: 176 }}>
                <Option value="admin">管理员</Option>
                <Option value="user">普通用户</Option>
                <Option value="guest">访客</Option>
            </Form.Select>
        </Form>
    )
}