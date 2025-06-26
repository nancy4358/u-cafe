import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import StoresPage from './pages/StoresPage';
import StoreDetailPage from './pages/StoreDetailPage';
import FaqPage from './pages/FaqPage';
import CoffeeKnowledgePage from './pages/CoffeeKnowledgePage';
import CoffeeArticlePage from './pages/CoffeeArticlePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MemberCenterPage from './pages/MemberCenterPage';
import EditMemberPage from './pages/EditMemberPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import MemberLayout from './components/MemberLayout';
import AboutPage from './pages/AboutPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './pages/ScrollToTop';





function App() {
  return (
    
    <BrowserRouter>
    <Layout>
    <ToastContainer position="top-center" autoClose={2000} />
    <ScrollToTop />
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/stores" element={<StoresPage />} />
        <Route path="/stores/:slug" element={<StoreDetailPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/coffee-knowledge" element={<CoffeeKnowledgePage />} />
        <Route path="/coffee-knowledge/:slug" element={<CoffeeArticlePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:categorySlug" element={<ProductsPage />} />
        <Route path="/products/detail/:slug" element={<ProductDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="/member" element={<MemberLayout />}>
          <Route index element={<MemberCenterPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="edit" element={<EditMemberPage />} /> 
        </Route>

      </Routes>
    </Layout>
  </BrowserRouter>
  );
}

export default App;
