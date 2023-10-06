import React, { useState } from "react";

// import style manually
import "react-markdown-editor-lite/lib/index.css";
import "./Dashboard.scss";
import { Link, Route, Routes } from "react-router-dom";
import Post from "../components/CreatePost/CreatePost";
import MenegerPost from "../components/meneger-post/manegerPost";
import EditPost from "../components/EditPost/EditPost";

export default function DashBoard() {
    return (
        <div className="create-post-wp d-flex">
            <div className="site-bar col-3 ">
                <p className="mb-2">Menu</p>
                <div className="Post px-2 mb-2">
                    Bài Viết
                    <li className="mb-2">
                        <Link to="/dashboard/create-post">Thêm bài viết</Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/dashboard/get-all-blog">
                            Quản lí bài viết
                        </Link>
                    </li>
                </div>
                <div className="Ung-tuyen py-2 mb-2">
                    Ứng tuyển
                    <p>Quản lí người ứng tuyển</p>
                </div>
            </div>

            <Routes>
                <Route path="/create-post" element={<Post />} />
                <Route path="/get-all-blog" element={<MenegerPost />} />
                <Route path="/edit-post/:slug" element={<EditPost />} />
            </Routes>
        </div>
    );
}
