import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home, Login, Register, Tickets, NewTicket } from "./pages"
import { Header, PrivateRoute } from "./Components"
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

            <Route path="/tickets" element={<PrivateRoute />}>
              <Route path="/tickets" element={<Tickets />} />
            </Route>

            <Route path="/new-ticket" element={<PrivateRoute />}>
              <Route path="/new-ticket" element={<NewTicket />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer autoClose={1500} />
    </>
  )
}

export default App
