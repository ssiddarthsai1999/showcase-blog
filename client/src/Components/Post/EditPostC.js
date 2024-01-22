import React, { useEffect } from "react";
import { useState } from "react";
import MarkdownIt from "markdown-it";
import { ToastContainer, toast } from "react-toastify";
import MarkdownEditor from "react-markdown-editor-lite";
import { CloseIcon } from "@chakra-ui/icons";
import "react-markdown-editor-lite/lib/index.css";
import { useNavigate } from "react-router-dom";
import "./EachPost.css";

import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    HStack,
} from "@chakra-ui/react";
import { Tag, TagLabel, TagCloseButton, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EditPostC() {
    const { id } = useParams();
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const [title, setTitle] = useState(data.title);
    const [caption, setCaption] = useState(data.caption);
    const [category, setCategory] = useState(data.category);
    const [body, setBody] = useState("");
    const [route, setRoute] = useState(data.route);
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);
    const [cover_photo, setCover_photo] = useState(data.cover_photo);
    console.log(category, "category");
    const mdParser = new MarkdownIt({
        html: true,
        breaks: true,
        linkify: true,
        underline: true,
        highlight: null,
    });
    const handleEditPost = async (e) => {
        e.preventDefault();
        try {
            const profileData = JSON.parse(localStorage.getItem("profile"));
            const userToken = profileData?.token;
            const updatedData = {
                title,
                cover_photo,
                caption,
                tags,
                body,
                category,
                route,
            };

            const response = await axios.put(
                `${process.env.REACT_APP_API_ENDPOINT}/post/editEachPost/${id}`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );

            setData(response.data.post);
            toast.success("Edited successfully!", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                navigate("/admin/posts");
            }, [2000]);
            console.log("Post updated successfully!", response);
        } catch (error) {
            toast.error("Please try again", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.error("Error updating post:", error);
        }
    };
    const handleTagChange = (e) => {
        setTag(e.target.value);
    };

    const handleBodyChange = ({ text, html }) => {
        setBody(text);
    };

    const addTag = () => {
        if (tag.trim() !== "") {
            setTags([...tags, tag.trim()]);
            setTag("");
        }
    };

    const removeTag = (index) => {
        const updatedTags = [...tags];
        updatedTags.splice(index, 1);
        setTags(updatedTags);
    };

    useEffect(() => {
        const getAllPosts = async () => {
            const response = await axios.get(
                `${process.env.REACT_APP_API_ENDPOINT}/post/getEachPostAdmin/${id}`
            );
            setTitle(response.data.post.title);
            setCaption(response.data.post.caption);
            setCover_photo(response.data.post.cover_photo);
            setTags(response.data.post.tags || []);
            setBody(response.data.post.body);
            setRoute(response.data.post.route);
            setCategory(response.data.post.category);
            setData(response.data.post);
        };
        getAllPosts();
    }, [id]);
    console.log("category", category);
    return (
        <div className="max-w-7xl mx-auto py-[100px] p-10">
            <h2 className="text-center text-[30px] font-bold mb-10">
                Edit a Blog Post
            </h2>

            <form enctype="multipart/form-data" method="put">
                <div>
                    <FormControl isRequired className="mb-6 ">
                        <FormLabel>Title</FormLabel>
                        <Input
                            value={title}
                            type="text"
                            placeholder="title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <FormHelperText>
                            Enter the title of the post.
                        </FormHelperText>
                    </FormControl>

                    <FormControl isRequired className="mb-6 ">
                        <FormLabel>Route</FormLabel>
                        <Input
                            value={route}
                            type="text"
                            placeholder="route"
                            onChange={(e) => setRoute(e.target.value)}
                        />
                        <FormHelperText>
                            Enter the route of the post without any space
                            inbetween words.
                        </FormHelperText>
                    </FormControl>

                    <FormControl className="mb-6 ">
                        <FormLabel>Caption</FormLabel>
                        <Input
                            value={caption}
                            type="text"
                            placeholder="caption"
                            onChange={(e) => setCaption(e.target.value)}
                        />
                        <FormHelperText>
                            Enter the caption of the post.
                        </FormHelperText>
                    </FormControl>

                    <FormControl className="mb-6">
                        <FormLabel>Category</FormLabel>
                        <select
                            value={category}
                            className="w-[30%]  bg-transparent border border-white p-2 rounded-lg"
                            placeholder="Select option"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option
                                className="p-2 text-white bg-black"
                                value="ANALYSIS"
                            >
                                Analysis
                            </option>
                            <option
                                className="p-2  text-white bg-black"
                                value="TLDR"
                            >
                                Tldr
                            </option>
                        </select>
                        <FormHelperText>
                            Enter the category of the post.
                        </FormHelperText>
                    </FormControl>

                    <FormControl isRequired className="mb-6">
                        <FormLabel>Cover Photo</FormLabel>
                        <Input
                            value={cover_photo}
                            type="text"
                            placeholder="cover photo link"
                            onChange={(e) => setCover_photo(e.target.value)}
                        />
                        <FormHelperText>
                            Enter your cover photo link
                        </FormHelperText>
                    </FormControl>
                    {cover_photo?.length > 0 && (
                        <img
                            src={cover_photo}
                            className="w-[300px] h-[300px] mb-10 object-cover"
                            alt="coverphoto preview"
                        />
                    )}
                </div>
                <div className="mb-10">
                    <FormControl className="mb-6  ">
                        <FormLabel>Tag</FormLabel>

                        <div className="flex items-center align-middle gap-2">
                            {" "}
                            <Input
                                value={tag}
                                w="20%"
                                type="text"
                                placeholder="tags"
                                onChange={handleTagChange}
                            />
                            <Button
                                colorScheme="blue"
                                onClick={addTag}
                                className=""
                            >
                                Add tag
                            </Button>
                        </div>
                    </FormControl>

                    <HStack spacing={4}>
                        {tags.map((item, index) => (
                            <Tag
                                size={"lg"}
                                key={index}
                                borderRadius="full"
                                variant="solid"
                                paddingBottom="2px"
                                colorScheme="blue"
                            >
                                <TagLabel>#{item}</TagLabel>
                                <TagCloseButton
                                    type="button"
                                    onClick={() => removeTag(index)}
                                />
                            </Tag>
                        ))}
                    </HStack>
                </div>
                <div>
                    <FormControl isRequired className="mb-6 ">
                        <FormLabel>Body</FormLabel>
                        <MarkdownEditor
                            style={{
                                "& .button-type-underline": {
                                    display: "none",
                                },
                            }}
                            className="h-[500px]"
                            value={body}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={handleBodyChange}
                            config={{
                                view: {
                                    menu: true,
                                    md: true,
                                    html: true,
                                    fullScreen: true,
                                    hideMenu: false,
                                },
                                markdown: {
                                    shortcuts: true,
                                    sanitize: true,
                                    toolbar: [
                                        "bold",
                                        "italic",
                                        "strikethrough",
                                        "|",
                                        "code",
                                        "quote",
                                        "unordered-list",
                                        "ordered-list",
                                        "|",
                                        "link",
                                        "image",
                                        "table",
                                    ],
                                },
                            }}
                        />
                    </FormControl>
                </div>

                {/* <div className="markdown-preview mt-24">
                    {bodys.map((markdownContent, index) => (
                        <ReactMarkdown
                            remarkPlugins={[
                                remarkGfm,
                                remarkParse,
                                remarkRehype,
                            ]}
                            key={index}
                            children={markdownContent}
                        />
                    ))}
                </div> */}
                <Button
                    colorScheme="blue"
                    onClick={handleEditPost}
                    variant="outline"
                    type="submit"
                    size="lg"
                    className="mt-10"
                >
                    Save post
                </Button>
            </form>
        </div>
    );
}

export default EditPostC;
