import React from "react";
import AllPostsC from "../../Components/Post/AllPostsC";
import AllPostsTable from "../../Components/Admin/AllPostsTable";

function AllPosts() {
    return (
        <div className="max-w-7xl mx-auto justify-center align-middle items-center  w-full pt-[100px] ">
            <h1 className="text-center mb-10">Posts</h1>
            
            <AllPostsTable />
        </div>
    );
}

export default AllPosts;
