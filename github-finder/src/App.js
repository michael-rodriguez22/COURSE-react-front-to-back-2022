import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { GitHubProvider } from "./context/github/GitHubContext"
import { AlertProvider } from "./context/alert/AlertContext"
import { Home, About, User, NotFound } from "./pages"
import { Alert, Footer, Navbar } from "./components/layout"

function App() {
  return (
    <GitHubProvider>
      <AlertProvider>
        <Router>
          <div className="flex flex-col justify-between h-screen">
            <Navbar />
            <main className="container mx-auto px-3 pb-12">
              <Alert />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/user/:login" element={<User />} />
                <Route path="/notfound" element={<NotFound />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AlertProvider>
    </GitHubProvider>
  )
}

export default App
