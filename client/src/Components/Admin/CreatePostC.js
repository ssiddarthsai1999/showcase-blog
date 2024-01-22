import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import MarkdownEditor from "react-markdown-editor-lite";
import { useNavigate } from "react-router-dom";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";
import BlockCreationCard from "../Post/Cards/BlockCreationCard";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Select,
    IconButton,
    HStack,
} from "@chakra-ui/react";
import {
    Tag,
    TagLabel,
    TagLeftIcon,
    TagRightIcon,
    TagCloseButton,
    Button,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
function CreatePostC() {
    const [title, setTitle] = useState("");
        const [route, setRoute] = useState("");
    const [caption, setCaption] = useState("");
    const [body, setBody] = useState("");
    const [bodys, setBodys] = useState([]);
    const [tag, setTag] = useState("");
    const [category, setCategory] = useState("ANALYSIS");
    const [tags, setTags] = useState([]);
    const [cover_photo, setCover_photo] = useState("");
    const navigate = useNavigate();
    const mdParser = new MarkdownIt({
        html: true,
        breaks: true,
        linkify: true,
        underline: true,
    });

    const handleImageChange = (e) => {
        // setImage(URL.createObjectURL(e.target.files[0]));
        setCover_photo(e.target.value);
    };

    const handleTagChange = (e) => {
        setTag(e.target.value);
    };

    const handleBodyChange = ({ text, html }) => {
        setBody(text); // Store raw text
    };

    const addBody = () => {
        if (body.trim() !== "") {
            setBodys([...bodys, body]);
            setBody("");
        }
    };

    const removeBody = (index) => {
        const updatedBody = [...bodys];
        updatedBody.splice(index, 1);
        setBodys(updatedBody);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const profileData = JSON.parse(localStorage.getItem("profile"));
            const userToken = profileData?.token;
            const response = await axios.post(
                `${process.env.REACT_APP_API_ENDPOINT}/post/createPost`,
                { title, body, tags, caption, cover_photo, category, route },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );
            toast.success("Post created successfully!", {
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
            console.log("Post created:", response.data);
        } catch (error) {
            toast.error("Please try again.", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.error("Error creating post:", error);
        }
    };

    console.log("category", category);

    return (
        <div className="max-w-7xl mx-auto py-[100px] p-10">
            <h2 className="text-center text-[30px] font-bold mb-10">
                Create a Blog Post
            </h2>

            <form
                onSubmit={handleSubmit}
                enctype="multipart/form-data"
                method="post"
            >
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
                            Enter the route of the post without any space inbetween words.
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
                    <FormControl isRequired className="mb-6  ">
                        <FormLabel>Body</FormLabel>
                        <MarkdownEditor
                            style={{
                                "& .button-type-underline": {
                                    display: "none",
                                },
                            }}
                            className="h-[400px]  markdownEditorBg "
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
                    variant="outline"
                    type="submit"
                    size="lg"
                    className="mt-10"
                >
                    Add post
                </Button>
            </form>
        </div>
    );
}

export default CreatePostC;
