import { User } from './search-panel'
import { Table } from 'antd'
import dayjs from 'dayjs'
interface Project {
    id:string,
    name:string,
    personId:string,
    pin:string,
    organization:string,
    created:number
}

interface ListProps{
    list:Project[],
    users:User[]
    
}

export default ({ list, users }:ListProps) => {
    return <Table pagination={false} rowKey={record=>record.id} columns={[{
        title:'名称',
        dataIndex:'name',
        sorter(a,b){
            return a.name.localeCompare(b.name)
        }
    },{
        title:'负责人',
        render(value,project){
            return (
                <span>{users.find(user => user.id === project.personId)?.name || '未知'}</span>
            )
        }
    },{
        title: "部门",
        dataIndex: "organization",
    },
    {
        title: "创建时间",
        render(value, project) {
          return (
            <span>
              {project.created
                ? dayjs(project.created).format("YYYY-MM-DD")
                : "无"}
            </span>
          );
        },
    },]} dataSource={list}/>
}