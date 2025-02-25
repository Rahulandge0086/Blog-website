import React,{ useContext } from "react";
import Header from "./Header";
import GalleryCard from "./Mainpage/GalleryCard";
import Footer from "./Footer";
import Create from "./CreatePage/create";
import View from "./ViewPage/View";
import Contact from "./ContactPage/contact";
import Gallery from "./Mainpage/Gallery";
import { BrowserRouter, Route, Routes ,Navigate} from "react-router-dom";
import { AuthContext,AuthProvider } from "../AuthContext";
import Login from "./Login";

const PrivateRoute = ({element})=>{
  const {isAuthenticated} = useContext(AuthContext);
  if(isAuthenticated===false){

  }
  return isAuthenticated ? element : <Navigate to="/login" />;
}

export default function App() {
  const { loading } = useContext(AuthContext);

  
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <AuthProvider>
      <BrowserRouter>
        <PrivateRoute element={<Header />} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute element={<GalleryCard />} />} />
          <Route path="/create" element={<PrivateRoute element={<Create />} />} />
          <Route path="/create/:id" element={<PrivateRoute element={<Create />} />} />
          <Route path="/view" element={<PrivateRoute element={<View />} />} />
          <Route path="/gallery" element={<PrivateRoute element={<Gallery />} />} />
          <Route path="/contact" element={<PrivateRoute element={<Contact />} />} />
        </Routes>
        <PrivateRoute element={<Footer />} />
      </BrowserRouter>
    </AuthProvider>
  );
}

