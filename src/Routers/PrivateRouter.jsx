import { useEffect, useState } from "react";

export default function PrivateRouter({ children }) {
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        let isLogin = false;

        if (!isLogin) {
            window.location.href = "/";
        } else {
            setIsValid(true);
        }
    }, []);

    return <div>{isValid && children}</div>;
}
