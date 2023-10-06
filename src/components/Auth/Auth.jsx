import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "../../axios";

export default function Auth() {
    const [login, setLogin] = useState(true);
    const [isViewPassword, setIsViewPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const params = useParams();

    function handleSubmit() {
        let dataBuilder = {
            email: email,
            password: password,
        };

        if (login) {
            axios.post("/api/v1/login", dataBuilder).then((response) => {
                if (response.errCode === 0) {
                    localStorage.setItem("user", JSON.stringify(response.user));
                    window.location.href("/dashboard");
                } else {
                    alert(response.msg);
                }
            });
        } else {
            dataBuilder.firstName = firstName;
            dataBuilder.lastName = lastName;

            console.log(dataBuilder);
            axios.post("/api/v1/register", dataBuilder).then((response) => {
                if (response.errCode === 0) {
                    localStorage.setItem("user", JSON.stringify(response.user));
                    window.location.href = "/dashboard";
                } else {
                    alert(response.msg);
                }
            });
        }
    }

    useEffect(() => {
        if (params.method === "login") {
            setLogin(true);
        } else {
            setLogin(false);
        }
    }, [params.method]);

    return (
        <>
            <div className="auth-wp">
                <button onClick={() => setLogin(!login)}>
                    {login
                        ? "Bạn Chưa Có Tài Khoản? Đăng Ký"
                        : "Bạn Đã Có Tài Khoản? Đăng nhập"}
                </button>
                <br />
            </div>
            {login ? (
                <div>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nhập email"
                    />
                    <input
                        type={isViewPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập password"
                    />
                </div>
            ) : (
                <div>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nhập email"
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập password"
                    />
                    <input
                        placeholder="first Name"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        placeholder="last Name"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
            )}
            <button onClick={handleSubmit}>
                {login ? "Đăng Nhập" : "Đăng Ký"}
            </button>
        </>
    );
}
