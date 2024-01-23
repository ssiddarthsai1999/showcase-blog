import React from "react";
import ArticleCard from "../Article/ArticleCard/ArticleCard";
import bali from "../../Assets/staticassets/bali.jpg";
import hungary from "../../Assets/staticassets/hungary.jpg";
import japan from "../../Assets/staticassets/japan.jpg";

function DestinationsC() {
    const articleData = [
        {
            title: "Exploring the Beauty of Bali",
            author: "Sarah Smith",
            country: "Bali",
            caption:
                "Embark on a journey to the tropical paradise of Bali and experience its breathtaking landscapes and vibrant culture.",
            createdAt: "2024-02-10",
            img: bali, // Replace with actual image path
        },
        {
            title: "Discovering the Charms of Hungary",
            author: "András Kovács",
            country: "Hungary",
            caption:
                "Explore the historic streets and vibrant culture of Hungary, and uncover its hidden gems.",
            createdAt: "2024-02-08",
            img: hungary, // Replace with actual image path
        },
        {
            title: "Japan's Cherry Blossom Season",
            author: "Yuki Tanaka",
            country: "Japan",
            caption:
                "Immerse yourself in the beauty of Japan's cherry blossoms during the enchanting sakura season.",
            createdAt: "2024-02-05",
            img: japan, // Replace with actual image path
        },
        {
            title: "Exploring the Magic of Paris",
            author: "Élise Dupont",
            country: "France",
            caption:
                "Discover the romance and enchantment of Paris as you stroll along the Seine, visit iconic landmarks, and savor delicious cuisine.",
            createdAt: "2024-02-15",
            img: "https://images.wallpaperscraft.com/image/single/eiffel_tower_paris_france_122444_3840x2400.jpg", // Replace with actual image path
        },
        {
            title: "Captivating Cairo: Egypt's Ancient Gem",
            author: "Ahmed Hassan",
            country: "Egypt",
            caption:
                "Unearth the mysteries of ancient Egypt as you explore the pyramids, temples, and bustling markets of Cairo.",
            createdAt: "2024-02-12",
            img: "https://images.wallpaperscraft.com/image/single/camel_pyramids_egypt_77063_1680x1050.jpg", // Replace with actual image path
        },
        {
            title: "Enchanted by Venice: Italy's Floating City",
            author: "Isabella Rossi",
            country: "Italy",
            caption:
                "Wander through the maze-like canals and admire the art, history, and architecture of Venice, Italy's unique floating city.",
            createdAt: "2024-02-20",
            img: "https://images.wallpaperscraft.com/image/single/venice_canal_gondola_9661_2560x1600.jpg", // Replace with actual image path
        },
        {
            title: "Adventures in Sydney: Australia's Coastal Gem",
            author: "Liam Wilson",
            country: "Australia",
            caption:
                "Experience the thrill of surfing, explore vibrant neighborhoods, and enjoy the stunning beaches of Sydney, Australia.",
            createdAt: "2024-02-18",
            img: "https://images.wallpaperscraft.com/image/single/sydney_australia_night_82525_4820x3087.jpg", // Replace with actual image path
        },
        {
            title: "Mystical Marrakech: Morocco's Exotic Oasis",
            author: "Amina Khalid",
            country: "Morocco",
            caption:
                "Get lost in the bustling souks, visit historic palaces, and savor flavorful Moroccan cuisine in the enchanting city of Marrakech.",
            createdAt: "2024-02-25",
            img: "https://images.wallpaperscraft.com/image/single/morocco_mountains_tops_14966_1600x1200.jpg", // Replace with actual image path
        },
        {
            title: "Charming Cape Town: South Africa's Coastal Gem",
            author: "Sipho Ndlovu",
            country: "South Africa",
            caption:
                "Explore the diverse landscapes, wildlife, and vibrant culture of Cape Town, South Africa's stunning coastal city.",
            createdAt: "2024-02-22",
            img: "https://images.wallpaperscraft.com/image/single/cape_town_africa_shore_110759_5312x2988.jpg", // Replace with actual image path
        },
    ];


    return (
        <div className="flex  mx-auto align-middle justify-evenly flex-col  w-full items-center ">
            <div className=" p-14">
          
 
            </div>
            <div className="   flex justify-center ">
                <ArticleCard articleData={articleData} />
            </div>
      
        </div>
    );
}

export default DestinationsC;
