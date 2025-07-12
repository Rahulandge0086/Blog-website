import React,{ useContext,useState } from "react";
import Header from "./Header";
import GalleryCard from "./Mainpage/GalleryCard";
import Footer from "./Footer";
import Create from "./CreatePage/create";
import View from "./ViewPage/View";
import BlogView from "./ViewPage/BlogView";
import Contact from "./ContactPage/contact";
import Gallery from "./Mainpage/Gallery";
import Profile from "./ProfilePage/Profile";
import { BrowserRouter, Route, Routes ,Navigate} from "react-router-dom";
import { AuthContext,AuthProvider } from "../AuthContext";
import Login from "./Login";
import Document from "./CreatePage/document";
import Registration from "./Registration";

const PrivateRoute = ({element})=>{
  const {isAuthenticated} = useContext(AuthContext);
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
        {/* <PrivateRoute element={<Header />} /> */}
        <Header/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<GalleryCard />} />
          <Route path="/reg" element={<PrivateRoute element={<Registration />} />} />
          <Route path="/document" element={<PrivateRoute element={<Document />} />} />
          <Route path="/blogview" element={<PrivateRoute element={<BlogView />} />} />
          <Route path="/create" element={<PrivateRoute element={<Create />} />} />
          <Route path="/document/:id" element={<PrivateRoute element={<Document />} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/view" element={<PrivateRoute element={<View />} />} />
          <Route path="/gallery" element={<PrivateRoute element={<Gallery />} />} />
          <Route path="/contact" element={<PrivateRoute element={<Contact />} />} />
        </Routes>
        {/* <PrivateRoute element={<Footer />} /> */}
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

