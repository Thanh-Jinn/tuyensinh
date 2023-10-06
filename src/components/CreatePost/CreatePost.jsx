import axios from "axios";
import MarkdownIt from "markdown-it";
import { useRef, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function Post() {
    const [state, setState] = useState({
        html: "",
        text: "",
    });

    const [previewThumbnail, setPreviewThumbnail] = useState("");
    const [Thumbnail, setThunbnail] = useState(null);
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [cate, setCate] = useState("");

    function handleEditorChange({ html, text }) {
        setState({ html: html, text: text });
    }
    const ref = useRef(null);

    function handleChangeThumbnail(e) {
        const inPutElement = ref.current;

        if (inPutElement) {
            inPutElement.click();
        }
    }

    function handleChangeFileThumnail(e) {
        let file = e.target.files[0];
        if (file) {
            let preview = URL.createObjectURL(file);
            setPreviewThumbnail(preview);
        }
    }

    async function handleSubmid() {
        if (!file || !Thumbnail) {
            alert("Please select file and thumbnail");
            return;
        }

        const fileUpload = await axios.post(
            "/api/v1/upload-file",
            {
                filesUploaded: file,
            },
            {
                headers: {
                    "content-type": "multipart/form-data",
                },
            }
        );

        const thumbnailUpload = await axios.post(
            "/api/v1/upload-file",
            {
                filesUploaded: thumbnail,
            },
            {
                headers: {
                    "content-type": "multipart/form-data",
                },
            }
        );

        let dataBuilder = {
            title: title,
            Thumbnail: thumbnailUpload.file.filename,
            file: fileUpload.file.filename,
            type: cate || "B4",
            contentHTML: state.html,
            contentText: state.text,
        };
        await axios.post("/api/v1/create-blog", dataBuilder);
    }

    return (
        <>
            <div className="create-post col-9">
                <h2>Tạo Bài Viết Của Bạn</h2>
                <div
                    className="preview-img"
                    style={{
                        backgroundImage: `url(${
                            previewThumbnail
                                ? previewThumbnail
                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRxmRKxe2fIgLSHQZry_GbehTVXYv9tnZiJA&usqp=CAU"
                        })`,
                    }}
                >
                    <div>
                        <input
                            type="file"
                            hidden
                            ref={ref}
                            onChange={handleChangeFileThumnail}
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
                                placeholder="Nhập tên bài viết của bạn......"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="form-control "
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
                                value={cate}
                                onChange={(e) => setCate(e.target.value)}
                            >
                                <option>---------</option>
                                <option>---------</option>
                                <option>---------</option>
                                <option>---------</option>
                            </select>
                        </div>
                    </div>
                </div>
                <MdEditor
                    style={{ height: "500px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                    onImageUpload={function () {}}
                />

                <button className="button-post" onClick={handleSubmid}>
                    Tạo bài viết
                </button>
            </div>
        </>
    );
}
