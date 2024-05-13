import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/User/Dashboard';
import PrivateRoute from './components/Routes/Private';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateGenre from './pages/Admin/CreateGenre';
import CreateMovie from './pages/Admin/CreateMovie';
import Users from './pages/Admin/Users';
import ForgotPasssword from './pages/Auth/ForgotPassword';
import Profile from './pages/User/Profile';
import Movies from './pages/Admin/Movies';
import UpdateMovie from './pages/Admin/UpdateMovie';
import Search from './pages/Search';
import MovieDetails from './pages/MovieDetails';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:slug" element={<MovieDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-genre" element={<CreateGenre />} />
          <Route path="admin/create-movie" element={<CreateMovie />} />
          <Route path="admin/movie/:slug" element={<UpdateMovie />} />
          <Route path="admin/movies" element={<Movies />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
