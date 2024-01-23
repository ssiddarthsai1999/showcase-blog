import { useEffect, useState } from "react";
import EachPostC from "../../Components/Post/EachPostC";
import bali from "../../Assets/staticassets/bali.jpg"
import hungary from "../../Assets/staticassets/hungary.jpg";
import japan from "../../Assets/staticassets/japan.jpg";
function EachPost() {
const articleData = [
    {
        title: "Exploring the Beauty of Bali",
        author: "Sarah Smith",
        country: "Bali",
        caption:
            "Embark on a journey to the tropical paradise of Bali and experience its breathtaking landscapes and vibrant culture.",
        createdAt: "2024-02-10",
        img: bali, // Replace with actual image path
        body: `Bali, often referred to as the "Island of the Gods," is a true tropical paradise in Indonesia. This enchanting island is known for its stunning landscapes, vibrant culture, and warm hospitality. From lush rice terraces to pristine beaches, Bali offers a diverse range of experiences for travelers.

        Bali's natural beauty is a major draw for tourists. Explore the terraced rice fields of Ubud, hike to hidden waterfalls, and take in the breathtaking views from Mount Batur. The island is also famous for its world-class surfing spots, such as Uluwatu and Kuta Beach.

        Immerse yourself in the rich Balinese culture by visiting ancient temples like Uluwatu Temple and Besakih Temple. Don't miss the traditional Balinese dance performances and art galleries in Ubud.

        Bali is a food lover's paradise, offering a wide range of culinary delights. Try local dishes like nasi goreng (fried rice) and satay, or dine at beachfront seafood restaurants.

        Whether you're seeking relaxation on the beach, adventure in the jungle, or a cultural experience, Bali has something for every traveler. It's no wonder that Bali continues to be a top destination for those seeking a tropical escape.`,
    },
    {
        title: "Discovering the Charms of Hungary",
        author: "András Kovács",
        country: "Hungary",
        caption:
            "Explore the historic streets and vibrant culture of Hungary, and uncover its hidden gems.",
        createdAt: "2024-02-08",
        img: hungary, // Replace with actual image path
        body: `Hungary, located in the heart of Europe, is a country filled with history, culture, and hidden gems waiting to be discovered. From the enchanting streets of Budapest to the tranquil countryside, Hungary offers a diverse range of experiences for travelers.

        Begin your journey in Budapest, the capital city, known for its stunning architecture and thermal baths. Explore the historic Buda Castle, take a cruise along the Danube River, and relax in the famous Széchenyi Thermal Bath.

        Beyond Budapest, Hungary boasts charming towns like Eger and Pécs, each with its own unique character and attractions. Eger is famous for its wine production, while Pécs is known for its cultural heritage and museums.

        Don't miss the chance to taste traditional Hungarian dishes, including goulash and chimney cake, at local restaurants and markets.

        Hungary's rich history is evident in its castles, fortresses, and churches. Explore sites like the medieval Bory Castle and the fairy-tale-like Visegrád Castle.

        Whether you're interested in history, culture, or simply enjoying the local cuisine, Hungary has much to offer for travelers seeking an authentic European experience.`,
    },
    {
        title: "Japan's Cherry Blossom Season",
        author: "Yuki Tanaka",
        country: "Japan",
        caption:
            "Immerse yourself in the beauty of Japan's cherry blossoms during the enchanting sakura season.",
        createdAt: "2024-02-05",
        img: japan, // Replace with actual image path
        body: `Japan's cherry blossom season, known as "sakura" season, is a magical time of year when the entire country is blanketed in delicate pink and white blossoms. This fleeting spectacle draws visitors from around the world to experience the beauty of nature's renewal.

        The sakura season typically begins in late March or early April, depending on the region and weather conditions. Tokyo, Kyoto, and Hiroshima are among the most popular destinations to view cherry blossoms.

        Stroll through parks like Ueno Park and Shinjuku Gyoen in Tokyo, where cherry trees create a stunning canopy of blossoms. In Kyoto, visit Maruyama Park and Philosopher's Path for a serene sakura experience.

        Apart from cherry blossom viewing, sakura-themed food and drinks are a must-try. Enjoy sakura-flavored sweets, cherry blossom tea, and even sakura-infused sake.

        The sakura season is not just about flowers; it's a celebration of spring, and many festivals and events take place during this time. Hanami parties (flower viewing gatherings) are a tradition where friends and families come together for picnics under the blossoms.

        Embrace the beauty of Japan's cherry blossoms and immerse yourself in the rich cultural experience that accompanies this enchanting season.`,
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
        <div className="max-w-full w-full    mx-auto justify-center align-middle items-center ">
            <EachPostC articleData={articleData} />
        </div>
    );
}

export default EachPost;
