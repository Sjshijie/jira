import { User } from './search-panel'
import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
export interface Project {
    id:string,
    name:string,
    personId:string,
    pin:string,
    organization:string,
    created:number
}

interface ListProps extends TableProps<Project>{
    users:User[]
    
}

export default ({ users, ...props }:ListProps) => {
    return <Table pagination={false} rowKey={record=>record.id} {...props} columns={[{
        title:'名称',
        render(value,project){
            return (
               <Link to={`projects/${project.id}`}>{project.name}</Link>
            )
        },
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
    },]}/>
}