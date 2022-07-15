// import { useState, useEffect } from "react";

const Title = () => {
    // **** The following commented block is an example of how to use the express API
    // const [title, setTitle] = useState("");

    // useEffect(() => {
    //     fetchTitle();
    // }, []);

    // const fetchTitle = () => {
    //     fetch("/api/hello")
    //     .then((res) => {
    //         if (res.ok) return res.json();
    //         return res.json().then(json => Promise.reject(json));
    //     })
    //     .then(({ message }) => {
    //         setTitle(message);
    //     })
    //     .catch((err) => {
    //         console.error(err);
    //     })
    // }

    return (
        <div>
            <h1>
                {/* {title === "" ? "Loading..." : title} */}
                SpeedKana
            </h1>
        </div>
    )
}

export default Title;