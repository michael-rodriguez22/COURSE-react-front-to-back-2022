import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home, Login, Register } from "./pages"
import { Header } from "./Components"

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
    </>
  )
}

export default App
