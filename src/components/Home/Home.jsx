import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { Link } from "react-router-dom";

export default function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("/api/v1/get-all-blogs").then((response) => {
            if (response.errCode === 0) {
                setData(response.data);
            } else {
                alert(response.msg);
            }
        });
    }, []);

    return (
        <div>
            {data &&
                data.length > 0 &&
                data.map(function (item) {
                    return (
                        <div key={item.id}>
                            <Link to={`/blog/${item.slug}`}>
                                <img
                                    src={`http://localhost:8080/files/${item.thumbnail}`}
                                />
                                <h3>{item.title}</h3>
                            </Link>
                        </div>
                    );
                })}
        </div>
    );
}
