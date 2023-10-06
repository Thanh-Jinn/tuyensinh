import { Link } from "react-router-dom";
import axios from "../../axios";
import { useEffect, useState } from "react";

function MenegerPost() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        async function _fetch() {
            const data = await axios.get("/api/v1/get-all-blogs");

            setBlogs(data.data);
        }
        _fetch();
    }, []);

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Stt</th>
                    <th>Thumbnail</th>
                    <th>Tên bài viết </th>
                    <th>Loại</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {blogs.map((item, index) => {
                    return (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>
                                <img src={item.thumbnail} alt="" />
                            </td>
                            <td>{item.title}</td>
                            <td>{item?.typeData?.title}</td>
                            <td>
                                <button>xoa</button>
                                <Link to={`/Dashboard/edit-post/${item.slug}`}>
                                    Sửa
                                </Link>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default MenegerPost;
