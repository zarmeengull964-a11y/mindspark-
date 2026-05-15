import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { ToastProvider } from './context/ToastContext';
import { AuthGateProvider } from './context/AuthGateContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import CoursePage from './pages/CoursePage';
import Quiz from './pages/Quiz';
import Exercises from './pages/Exercises';
import ProgressPage from './pages/Progress';
import Tools from './pages/Tools';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import Tutorials from './pages/Tutorials';
import Reference from './pages/Reference';
import Certificate from './pages/Certificate';
import Pdfs from './pages/Pdfs';
import Chatbot from './pages/Chatbot';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <ProgressProvider>
            <ToastProvider>
              <BrowserRouter>
                <AuthGateProvider>
                  <a href="#main-content" className="ms-skip-link">Skip to main content</a>
                  <ScrollToTop />
                  <div className="ms-page">
                    <Navbar />
                    <main id="main-content" className="ms-main" tabIndex="-1">
                      <ErrorBoundary>
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/tutorials" element={<Tutorials />} />
                          <Route path="/reference" element={<Reference />} />
                          <Route path="/exercises" element={<Exercises />} />
                          <Route path="/certificate" element={<Certificate />} />
                          <Route path="/pdfs" element={<Pdfs />} />
                          <Route path="/chatbot" element={<Chatbot />} />
                          <Route path="/course/:language" element={<CoursePage />} />
                          <Route path="/quiz" element={<Quiz />} />
                          <Route path="/assignments" element={<Exercises />} />
                          <Route path="/progress" element={<ProgressPage />} />
                          <Route path="/tools" element={<Tools />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/signup" element={<Signup />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </ErrorBoundary>
                    </main>
                    <Footer />
                  </div>
                </AuthGateProvider>
              </BrowserRouter>
            </ToastProvider>
          </ProgressProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
