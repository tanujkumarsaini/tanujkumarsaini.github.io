import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './components/Login';
import About from './components/About';
import Signup from './components/Signup';
import Profile from './components/Profile';
import { Navbar } from 'reactstrap';
import CustomNavbar from './components/CustomNavbar';
import Services from './components/Services';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import PrivateRoutes from './components/PrivateRoutes';
import Store from './components/Store';
import Test from './components/Test';
import Cart from './components/Cart';
import { CartProvider,UserNameProvider } from './context';
import Orders from './components/Orders';
import ViewProduct from './components/ViewProduct';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHome from './pages/admin/AdminHome';
import AddProduct from './pages/admin/AddProduct';
import ViewCategories from './pages/admin/ViewCategories';
import ViewProducts from './pages/admin/ViewProducts';
import AddCategory from './pages/admin/AddCategory';
import ManageOrders from './pages/admin/ManageOrders';
import ManageUsers from './pages/admin/ManageUsers';
import UpdateProducts from './pages/admin/UpdateProducts';
const sayHello=()=>alert('hello, how are  you')

function App() {
  return (
    <UserNameProvider>
    <CartProvider>
    <BrowserRouter>
    <ToastContainer/>
    
    <Routes>
    <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/profile' element={<Profile/>}/>
      
      <Route path='/services' element={<Services/>}/>
      <Route path='/store/:categoryId' element={<Store/>}/>
      <Route path='/view-product/:productId' element={<ViewProduct/>}/>
      
      

      <Route path='/user' element={<PrivateRoutes/>}>
      <Route path='dashboard' element={<Dashboard/>}/>
      <Route path='cart' element={<Cart/>} />
      <Route path='orders' element={<Orders/>}/>
      </Route>

      <Route path='/admin-dashboard' element={<AdminDashboard/>} >
        <Route path='home' element={<AdminHome/>}/>
        <Route path='add-product' element={<AddProduct/>}/>
        <Route path='view-products' element={<ViewProducts/>}/>
        <Route path='view-categories' element={<ViewCategories/>}/>
        <Route path='add-category' element={<AddCategory/>}/>
        <Route path='orders' element={<ManageOrders/>}/>
        <Route path='users' element={<ManageUsers/>}/>
        <Route path='update-product/:productId' element={<UpdateProducts/>}/>
        </Route>




    </Routes>
    </BrowserRouter>
    </CartProvider>
    </UserNameProvider>
    );
}

export default App;
