import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Collection from "./pages/Collection";
import Navbar from "./components/Navbar";
import Category from "./pages/Category";
import Categories from "./components/Categories";
import NotFound from "./pages/NotFound";
import SearchCategories from "./pages/SearchCategories";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Categories />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/search" element={<SearchCategories />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
