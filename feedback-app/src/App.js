import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import {
  Header,
  FeedbackForm,
  FeedbackStats,
  FeedbackList,
  AboutIconLink,
} from "./components"
import AboutPage from "./pages/AboutPage"
import { FeedbackProvider } from "./context/FeedbackContext"

function App() {
  return (
    <>
      <FeedbackProvider>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <>
                    <FeedbackForm />
                    <FeedbackStats />
                    <FeedbackList />
                  </>
                }
              ></Route>
              <Route path="/about" element={<AboutPage />} />
            </Routes>
            <AboutIconLink />
          </div>
        </Router>
      </FeedbackProvider>
    </>
  )
}

export default App
