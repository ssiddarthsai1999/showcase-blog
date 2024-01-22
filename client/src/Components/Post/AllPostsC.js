import { useEffect, useState } from "react";
import axios from "axios";
import AllPostsCard from "./Cards/AllPostsCard";
import { ToastContainer, toast } from "react-toastify";
function AllPostsC() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

   

    useEffect(() => {
        const getAllPosts = async () => {
            setIsLoading(true);
            const response = await axios.get(
                `${process.env.REACT_APP_API_ENDPOINT}/post/getAllPosts`
            );
            setData(response.data);
            setIsLoading(false);
            console.log(response.data, "response");
        };
        getAllPosts();
    }, [data]);

    return (
        <div className="max-w-7xl  ">
            <AllPostsCard
                data={data}
                isLoading={isLoading}
         
            />
        </div>
    );
}

export default AllPostsC;
