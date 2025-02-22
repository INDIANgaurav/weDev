import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import GenerateTasks from "./pages/GenerateTasks"

 

const App = () => {
  return (
    <div>
      <Routes>

      
      
      <Route path="/login" element={<Login/>}   />
      <Route path="/signup" element={<Signup/>}   />
      <Route path="/generate-task" element={<GenerateTasks/>}   />

     

  
      </Routes>
      
    </div>
  )
}

export default App
