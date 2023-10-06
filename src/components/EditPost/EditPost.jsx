import React, { useEffect, useRef, useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import axios from "../../axios";
import { useParams } from "react-router-dom";

const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function EditPost() {
    const [state, setState] = useState({
        html: "",
        text: "",
    });
    const [title, setTitle] = useState();
    const [file, setFile] = useState();
    const [categories, setCategories] = useState();
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState();

    const ref = useRef(null);
    let params = useParams();

    useEffect(() => {
        const _fetch = async () => {
            const Res = await axios.get(
                `/api/v1/get-blog-by-slug?slug=${params.slug}`
            );

            if (Res.errCode === 0) {
                const data = Res.blog;

                setTitle(data.title);

                console.log(data);
                setThumbnailPreview(
                    "http://localhost:8080/files/" + data.thumbnail
                );
                setState({
                    html: data.contentHTML,
                    text: data.contentMarkdown,
                });
                setFile(data.file);
                setThumbnail(data.thumbnail);
            }
        };

        _fetch();
    }, []);

    function handleEditorChange({ html, text }) {
        setState({ html: html, text: text });
    }

    function handleChangeThumbnail() {
        const InputElement = ref.current;

        if (InputElement) {
            InputElement.click();
        }
    }

    function handleChangeFileThumbnail(e) {
        let file = e.target.files[0];

        if (file) {
            let URL_PREVIEW = URL.createObjectURL(file);
            setThumbnailPreview(URL_PREVIEW);
            setThumbnail(file);
        }
    }

    // async await

    async function handleSubmit() {
        // if (!file || !thumbnail) {
        //     alert("Bạn hãy chọn file và ảnh!");
        //     return;
        // }

        // const fileUpload = await axios.post(
        //     "/api/v1/upload-file",
        //     {
        //         filesUploaded: file,
        //     },
        //     {
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //         },
        //     }
        // );
        // const thumbnailUpload = await axios.post(
        //     "/api/v1/upload-file",
        //     {
        //         filesUploaded: thumbnail,
        //     },
        //     {
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //         },
        //     }
        // );

        let dataBuilder = {
            title: title,
            file: file,
            type: categories || "B4",
            thumbnail: thumbnail,
            contentHTML: state.html,
            contentMarkdown: state.text,
            slug: params.slug,
        };

        await axios.put("/api/v1/update-blog", dataBuilder);
    }

    return (
        <>
            <div className="create-post col-9">
                <div className="preview-img">
                    <div>
                        <input
                            type="file"
                            hidden
                            ref={ref}
                            onChange={handleChangeFileThumbnail}
                        />
                        <span onClick={handleChangeThumbnail}>
                            + Thêm Ảnh Bài Viết
                        </span>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="row">
                        <div className="mb-3 col-6">
                            <input
                                placeholder="Nhập tên bài viết của bạn..."
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3 col-6">
                            <input
                                type="file"
                                className="form-control"
                                onChange={(e) => setFile(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 col">
                            <select
                                className="form-control"
                                value={categories}
                                onChange={(e) => setCategories(e.target.value)}
                            >
                                <option>---------</option>
                            </select>
                        </div>
                    </div>
                </div>
                <MdEditor
                    style={{ height: "500px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                    onImageUpload={() => {}}
                    value={state.text}
                />

                <button className="button-post" onClick={handleSubmit}>
                    Cập Nhật Bài Viết
                </button>
            </div>
        </>
    );
}
