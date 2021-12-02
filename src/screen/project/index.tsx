import React from "react"
import { Link } from 'react-router-dom'
import { Route, Routes, Navigate } from "react-router"
import { EpicScreen } from "screen/epic"
import { KanbanScreen } from "screen/Kanban"

export const ProjectScreen = ()=>{
    return (
        <div>
            <Link to={'kanban'}>看板</Link>
            <Link to={'epic'}>任务组</Link>
            <Routes>
                <Route path={'/kanban'} element={<KanbanScreen />}></Route>
                <Route path={'/epic'} element={<EpicScreen />}></Route>
                <Route index element={<KanbanScreen />} />
            </Routes>
        </div>
    )
}