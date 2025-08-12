import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'  
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import TaskListPages from './pages/TaskListPage'
import ShowTask from './pages/ShowTask'

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<HomePage />} />
        <Route path='/task-list' element={<TaskListPages />} />
        <Route path='/show-task/:taskid' element={<ShowTask />} />
      </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
