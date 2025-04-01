import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';

import PrivateRoute from './utils/privateRoute';

function App() {
  return (
    <Router >
      <ThemeProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<Signup />} />

              {/* <PrivateRoute path="/teams" exact component={Teams} />
              <PrivateRoute path="/teams/:id" component={TeamDetails} /> */}
            </Routes>
          </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
