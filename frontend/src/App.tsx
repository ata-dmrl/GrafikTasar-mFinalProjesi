import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import LearningMapPage from './pages/LearningMapPage'
import LessonPage from './pages/LessonPage'
import QuizPage from './pages/QuizPage'
import LeaderboardPage from './pages/LeaderboardPage'
import ChallengesPage from './pages/ChallengesPage'
import ProfilePage from './pages/ProfilePage'
import MessagesPage from './pages/MessagesPage'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore(s => s.token)
  return token ? <>{children}</> : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="learn" element={<LearningMapPage />} />
        <Route path="learn/:slug" element={<LessonPage />} />
        <Route path="learn/:slug/quiz" element={<QuizPage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route path="challenges" element={<ChallengesPage />} />
        <Route path="profile/:id" element={<ProfilePage />} />
        <Route path="messages" element={<MessagesPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
