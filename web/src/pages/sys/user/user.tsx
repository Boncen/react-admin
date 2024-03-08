import { useEffect, useState } from "react";
import TableList from "@/components/table-list";
import api from "@/api";

export default function User(){

    const [usersData, setUsersData] = useState([]);
    useEffect(()=>{
        api.getUserList({
            pageIndex: 1,
            pageSize: 10
        }).then(list=>{
            console.log(list);
            setUsersData(list);
        })
    }, [])

    const columns = [
        {
            title: '标题',
            dataIndex: 'name',
        },
        {
            title: '大小',
            dataIndex: 'size',
        },
        {
            title: '所有者',
            dataIndex: 'owner',
        },
        {
            title: '更新日期',
            dataIndex: 'updateTime',
        },
    ];
    return (
        <div>
             <TableList columns={columns} data={usersData} pagination={true} extraSearchForm={2}></TableList>
        </div>
    )
}