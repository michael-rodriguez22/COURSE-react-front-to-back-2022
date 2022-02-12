import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home, Login, Register } from "./pages"
import { Header } from "./Components"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer autoClose={1500} />
    </>
  )
}

export default App
