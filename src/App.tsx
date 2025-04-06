import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Login from './pages/Login';

import Dashboard from './pages/Dashboard';
import { PrivateRoute } from './utils/privateRoute';


function App() {
  return (
    <Router >
      <ThemeProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />

              <Route path='/dashboard' element={<PrivateRoute />}>
                <Route path="" element={<Dashboard />} />
              </Route>
            </Routes>
          </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
