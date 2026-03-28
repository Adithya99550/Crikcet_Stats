import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FormatProvider } from './hooks/useFormat';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import PlayersPage from './pages/PlayersPage';
import LeaderboardsPage from './pages/LeaderboardsPage';

function App() {
  return (
    <FormatProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="players" element={<PlayersPage />} />
            <Route path="leaderboards" element={<LeaderboardsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FormatProvider>
  );
}

export default App;
