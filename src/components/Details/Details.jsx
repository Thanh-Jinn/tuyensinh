import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";

function Details() {
    const params = useParams();

    const [data, setData] = useState(null);

    useEffect(() => {
        axios
            .get("/api/v1/get-blog-by-slug?slug=" + params.slug)
            .then((response) => {
                if (response.errCode === 0) {
                    setData(response.blog);
                } else {
                    alert(response.msg);
                }
            });
    }, [params.slug]);

    return <div dangerouslySetInnerHTML={{ __html: data?.contentHTML }}></div>;
}

export default Details;
