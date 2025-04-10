
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import Catalog from './pages/Catalog';
import Categories from './pages/Categories';
import NewReleases from './pages/NewReleases';
import Promotions from './pages/Promotions';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Admin Pages
import Dashboard from './pages/Admin/Dashboard';
import ProductsList from './pages/Admin/ProductsList';
import AddProduct from './pages/Admin/AddProduct';
import EditProduct from './pages/Admin/EditProduct';
import OrdersList from './pages/Admin/OrdersList';
import CustomersList from './pages/Admin/CustomersList';
import CategoriesList from './pages/Admin/CategoriesList';
import Settings from './pages/Admin/Settings';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/new-releases" element={<NewReleases />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/produtos" element={<ProductsList />} />
            <Route path="/admin/produtos/adicionar" element={<AddProduct />} />
            <Route path="/admin/produtos/editar/:id" element={<EditProduct />} />
            <Route path="/admin/pedidos" element={<OrdersList />} />
            <Route path="/admin/clientes" element={<CustomersList />} />
            <Route path="/admin/categorias" element={<CategoriesList />} />
            <Route path="/admin/configuracoes" element={<Settings />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
