import { Tabs } from "@douyinfe/semi-ui";
import { useState } from "react";
import useKeepAlive from '@/hooks/use-keepalive';
export default function MultiTabs(){
    const tabList = [
        { tab: '文档', itemKey: '1' },
        { tab: '快速起步', itemKey: '2' },
        { tab: '帮助', itemKey: '3' },
    ];
    const [key, setKey] = useState(1);
    const handleTabChange = (key: number)=>{
        console.log('tab change', key);
        setKey(key)
    }
    const {tabs} = useKeepAlive();
    const contentList = [<div>文档</div>, <div>快速起步</div>, <div>帮助</div>];

    return (
        <Tabs
                type="card"
                tabList={tabList}
                onChange={key => {
                    handleTabChange(Number(key));
                }}
            >
                {contentList[Number(key) - 1]}
            </Tabs>
    )
}