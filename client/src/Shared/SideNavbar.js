import {
    Box,
    Button,
    Drawer,
    DrawerOverlay,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    DrawerContent,
    VStack,
    Image,
} from "@chakra-ui/react";
import x from "../Assets/x.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
const SideNavbar = () => {
        const [activeNav, setActiveNav] = useState("posts");
        const handleActiveNav = (name) => {
            setActiveNav(name);
            console.log("activeNav", name);
        };
    return (
        <Box
            position="sticky"
            left={0}
            p={3}
            w="240px"
            minH="100vh"
            h="full"
            top={0}
            bg="gray-100"
            borderRight="1px solid #ddd"
        >
            <VStack h="full">
                <Box w="100%" display="flex" justifyContent="center">
                    <Image w="50%" src={x} alt="Loopple" />
                </Box>
                <Link to="/" className="w-full">
                    <Button w="100%"> Home</Button>
                </Link>
                <Link className="w-full " to="/admin/posts">
                    <Button
                        w="100%"
                        name="posts"
                        onClick={() => handleActiveNav("posts")}
                        colorScheme={activeNav === "posts" ? "blue" : "gray"}
                    >
                        Posts
                    </Button>
                </Link>
                <Link className="w-full " to="/admin/createpost">
                    <Button
                        w="100%"
                        name="createposts"
                        onClick={() => handleActiveNav("createposts")}
                        colorScheme={
                            activeNav === "createposts" ? "blue" : "gray"
                        }
                    >
                        Create Post
                    </Button>
                </Link>
                <Link className="w-full " to="/admin/subscribers">
                    <Button
                        w="100%"
                        name="subscribers"
                        onClick={() => handleActiveNav("subscribers")}
                        colorScheme={
                            activeNav === "subscribers" ? "blue" : "gray"
                        }
                    >
                        Subscribers
                    </Button>
                </Link>
            </VStack>
        </Box>
    );
};

export default SideNavbar;
