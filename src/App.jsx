import React from "react";
// import Home from "./components/Home/Home";
import { Link, Route, RouterProvider, Routes } from "react-router-dom";
import Profile from "./components/Profle/Profile";
import Details from "./components/Details/Details";
import PrivateRouter from "./Routers/PrivateRouter";
import Auth from "./components/Auth/Auth";
import Dasboard from "./Admin/Dashboard";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/dashboard/*" element={<Dasboard />}></Route>
            </Routes>
            {/* <Link to="/"> trang chu</Link>
            <Link to="/profile">Profile</Link> */}
            {/* <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route
                    path="/blog/:slug"
                    element={
                        <PrivateRouter>
                            <Details></Details>
                        </PrivateRouter>
                    }
                ></Route>
            </Routes> */}
            {/* <Auth /> */}
        </div>
    );
}

export default App;
