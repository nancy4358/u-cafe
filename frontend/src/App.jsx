import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import AppRoutes from './router/Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './pages/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <ToastContainer position="top-center" autoClose={2000} />
        <ScrollToTop />
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
