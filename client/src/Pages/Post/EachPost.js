import { useEffect, useState } from "react";
import EachPostC from "../../Components/Post/EachPostC";
import bali from "../../Assets/staticassets/bali.jpg";
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
            title2: "Exploring the Beauty of Bali",
            body2: `Bali, often referred to as the "Island of the Gods," is a true tropical paradise in Indonesia. This enchanting island is known for its stunning landscapes, vibrant culture, and warm hospitality. From lush rice terraces to pristine beaches, Bali offers a diverse range of experiences for travelers.

    Bali's natural beauty is a major draw for tourists. Explore the terraced rice fields of Ubud, hike to hidden waterfalls, and take in the breathtaking views from Mount Batur. The island is also famous for its world-class surfing spots, such as Uluwatu and Kuta Beach.

    Immerse yourself in the rich Balinese culture by visiting ancient temples like Uluwatu Temple and Besakih Temple. Don't miss the traditional Balinese dance performances and art galleries in Ubud.

    Bali is a food lover's paradise, offering a wide range of culinary delights. Try local dishes like nasi goreng (fried rice) and satay, or dine at beachfront seafood restaurants.

    Whether you're seeking relaxation on the beach, adventure in the jungle, or a cultural experience, Bali has something for every traveler. It's no wonder that Bali continues to be a top destination for those seeking a tropical escape.`,
            img2: "https://imageio.forbes.com/specials-images/imageserve/675172642/pura-ulun-danu-bratan-temple-in-Bali-/960x0.jpg?format=jpg&width=960", // Replace with actual image path for the second article
        },

        {
            title: "Discovering the Charms of Hungary",
            author: "András Kovács",
            country: "Hungary",
            title2: "Hungary's Hidden Treasures",
            body2: `Discover the lesser-known marvels of Hungary, a country rich in history and tradition. Venture beyond Budapest to explore the picturesque village of Hollókő, a UNESCO World Heritage site, known for its well-preserved folk traditions and charming architecture. Or, take a trip to the historic town of Szentendre, with its cobbled streets, art galleries, and quaint cafes.

Hungary's countryside offers serene landscapes, from the rolling hills of the Tokaj wine region to the vast plains of the Hortobágy National Park. Experience the hospitality of local communities, taste authentic Hungarian cuisine, and dive into the soothing thermal baths scattered throughout the country.

Hungary's cultural tapestry weaves a story of a nation proud of its heritage. Explore this narrative through the country's numerous festivals, traditional crafts, and folk music. Each moment in Hungary is an opportunity to uncover a blend of the old and the new, ensuring a travel experience that's as enriching as it is unforgettable.`,
            img2: "https://images.wallpaperscraft.com/image/single/hungary_budapest_night_city_119925_1920x1080.jpg", // Replace with actual image path for the second article

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
            title2: "Cultural Wonders of Japan",
            body2: `Japan, a country where tradition meets modernity, offers a tapestry of experiences beyond its cherry blossoms. Dive into the bustling streets of Tokyo, where cutting-edge technology and fashion coexist with centuries-old temples. Visit the historic city of Kyoto, where geishas and ancient tea houses offer a glimpse into Japan's rich cultural past.

Indulge in Japan's culinary delights, from the world-famous sushi to the heartwarming bowl of ramen. Embrace the art of Japanese cuisine, where precision and presentation play as much a part as taste.

Discover the rural landscapes of Japan, where the tranquility of the countryside offers a stark contrast to its urban counterparts. Experience the serenity of a traditional ryokan (Japanese inn), unwind in a natural onsen (hot spring), and partake in the age-old customs that are an integral part of Japan's cultural identity.

Japan's allure is not just in its landscapes and traditions but also in its people. The harmony, respect, and courtesy that define Japanese society make it a uniquely welcoming and fascinating place to explore.`,
            img2: "https://images.wallpaperscraft.com/image/single/japan_osaka_night_city_117958_1920x1080.jpg", // Replace with actual image path for the second article

            body: `Japan's cherry blossom season, known as "sakura" season, is a magnificent spectacle that paints the entire country in delicate hues of pink and white. It's a time when nature awakens from its winter slumber, and Japan's landscapes transform into a mesmerizing floral wonderland. This ephemeral phenomenon captivates visitors from across the globe, inviting them to partake in the country's annual celebration of rebirth and beauty.

    The sakura season typically begins in late March or early April, varying slightly depending on the region and the whims of nature. Iconic cities like Tokyo, Kyoto, and Hiroshima become the focal points for cherry blossom enthusiasts. As the blossoms unfurl, parks and gardens come alive with the enchanting sight and fragrance of cherry blossoms.

    In Tokyo, Ueno Park and Shinjuku Gyoen are among the most popular spots to witness this floral spectacle. These urban oases are transformed as cherry trees create a breathtaking canopy of blossoms that provides a serene escape from the bustling city.

    Kyoto, Japan's cultural heart, boasts its own share of sakura magic. Maruyama Park, with its iconic weeping cherry tree, and the Philosopher's Path, a canal-lined trail framed by cherry blossoms, offer an immersive sakura experience amidst historical and natural beauty.

    Beyond the visual feast, the sakura season indulges the palate as well. Sakura-themed delicacies such as sakura-flavored sweets, cherry blossom tea, and even sakura-infused sake are available. It's a sensory journey where the taste of spring mingles with its fragrance.

    The sakura season is not just about flowers; it's a celebration of spring's arrival. Festivals and events dot the calendar, each one embodying the essence of the season. Hanami parties, or flower viewing gatherings, are a cherished tradition where friends and families come together for picnics under the blossoms. As night falls, lanterns illuminate the trees, creating an enchanting atmosphere.

    Embrace the fleeting beauty of Japan's cherry blossoms, and immerse yourself in the rich cultural experience that accompanies this enchanting season. Whether you're a nature lover, a food enthusiast, or a seeker of cultural immersion, the sakura season in Japan offers a journey of discovery and wonder that will leave you with memories to cherish for a lifetime.`,
        },
        {
            title: "Exploring the Magic of Paris",
            author: "Élise Dupont",
            country: "France",
            title2: "The Artistic Heart of Paris",
            body2: `Paris, often hailed as the capital of art and fashion, invites you to explore its artistic masterpieces beyond the iconic landmarks. Wander through the Montmartre district, once the haunt of artists like Picasso and Van Gogh, and feel the creative pulse of the city.

Visit the Louvre, not just for the Mona Lisa, but for its vast collection spanning from ancient civilizations to 19th-century masterpieces. Explore the Musée d'Orsay for an impressive collection of Impressionist art, or venture into the Centre Pompidou for modern and contemporary art marvels.

Parisian cuisine is an art in itself. From quaint bistros serving classic French dishes to Michelin-starred restaurants offering innovative cuisine, the city caters to every palate. Don't forget to indulge in the simple pleasure of a fresh croissant or a delicate macaron from a local patisserie.

As the evening sets in, experience the Parisian nightlife. Enjoy a show at the Moulin Rouge, sip a glass of wine by the Seine, or simply stroll through the illuminated streets, and let the charm of Paris enfold you.`,
            img2: "https://images.wallpaperscraft.com/image/single/france_paris_eiffel_tower_125807_1920x1080.jpg", // Replace with actual image path for the second article

            caption:
                "Discover the romance and enchantment of Paris as you stroll along the Seine, visit iconic landmarks, and savor delicious cuisine.",
            createdAt: "2024-02-15",
            img: "https://images.wallpaperscraft.com/image/single/eiffel_tower_paris_france_122444_3840x2400.jpg", // Replace with actual image path
        },
        {
            title: "Captivating Cairo: Egypt's Ancient Gem",
            author: "Ahmed Hassan",
            country: "Egypt",
            title2: "Beyond the Pyramids of Egypt",
            body2: `Egypt's allure extends far beyond the majestic pyramids and the Sphinx. Discover the vibrant streets of Cairo, where the buzz of the bazaars and the scent of traditional spices fill the air. Visit the Egyptian Museum to witness the treasures of Tutankhamun and artifacts that tell tales of a civilization millennia old.

Take a cruise down the Nile, the lifeline of Egypt, and watch as the landscape transitions from bustling cities to tranquil villages and ancient temples. Visit Luxor, the world's greatest open-air museum, and explore the Valley of the Kings, where the tombs of pharaohs await.

Delve into the crystal-clear waters of the Red Sea, a paradise for divers and snorkelers. Discover vibrant coral reefs, exotic marine life, and the serene beauty of Egypt's coastal towns like Hurghada and Sharm El Sheikh.

In the evening, experience the warmth of Egyptian hospitality. Savor traditional dishes like koshari and falafel, and lose yourself in the rhythms of folk music and dance, under a sky lit with stars.`,
            img2: "https://images.wallpaperscraft.com/image/single/egypt_pyramids_sand_117767_1920x1080.jpg", // Replace with actual image path for the second article

            caption:
                "Unearth the mysteries of ancient Egypt as you explore the pyramids, temples, and bustling markets of Cairo.",
            createdAt: "2024-02-12",
            img: "https://images.wallpaperscraft.com/image/single/camel_pyramids_egypt_77063_1680x1050.jpg", // Replace with actual image path
        },
        {
            title: "Enchanted by Venice: Italy's Floating City",
            author: "Isabella Rossi",
            country: "Italy",
            title2: "Venice: A Journey Through Time",
            body2: `Venice, a city of timeless beauty and romance, invites you to discover its hidden alleys and serene canals. Step off the beaten path and explore the quiet neighborhoods, where the authentic Venetian lifestyle thrives away from the crowds.

Visit the historic palaces and art galleries that showcase the splendor of Venice's past. The Peggy Guggenheim Collection and the Palazzo Ducale offer glimpses into the art and history that shape this unique city.

Experience the local cuisine, where seafood plays a starring role, and the traditional cicchetti (small snacks) offer a taste of Venetian culinary tradition. Pair your meal with a glass of prosecco, and enjoy the flavors of Italy.

As the day fades, take a gondola ride through the canals. Glide under historic bridges, and let the rhythm of the water and the gentle serenades create an unforgettable moment, a testament to the enduring allure of Venice.`,
            img2: "https://images.wallpaperscraft.com/image/single/venice_italy_canal_122228_1920x1080.jpg", // Replace with actual image path for the second article

            caption:
                "Wander through the maze-like canals and admire the art, history, and architecture of Venice, Italy's unique floating city.",
            createdAt: "2024-02-20",
            img: "https://images.wallpaperscraft.com/image/single/venice_canal_gondola_9661_2560x1600.jpg", // Replace with actual image path
        },
        {
            title: "Adventures in Sydney: Australia's Coastal Gem",
            author: "Liam Wilson",
            country: "Australia",
            title2: "Sydney: A Blend of Natural and Urban Splendor",
            body2: `Sydney, a city celebrated for its stunning harbor and vibrant lifestyle, offers more than just iconic landmarks. Discover the hidden beaches and coastal walks that offer breathtaking views and a tranquil escape from the urban buzz.

Dive into Sydney's cultural scene by visiting its world-class museums and galleries. The Art Gallery of New South Wales and the Museum of Contemporary Art showcase a diverse collection of Australian and international art.

Indulge in Sydney's culinary delights, where fresh seafood, multicultural cuisine, and artisan cafes set the scene for an exquisite dining experience. Visit the Sydney Fish Market for a taste of local flavors, or explore the bustling food markets that bring the world's cuisine to your plate.

As the sun sets, experience Sydney's nightlife. From rooftop bars with panoramic views to live music venues that showcase local talent, Sydney's evening offerings provide the perfect end to a day of exploration and discovery.`,
            img2: "https://images.wallpaperscraft.com/image/single/sydney_australia_night_city_118987_1920x1080.jpg", // Replace with actual image path for the second article

            caption:
                "Experience the thrill of surfing, explore vibrant neighborhoods, and enjoy the stunning beaches of Sydney, Australia.",
            createdAt: "2024-02-18",
            img: "https://images.wallpaperscraft.com/image/single/sydney_australia_night_82525_4820x3087.jpg", // Replace with actual image path
        },
        {
            title: "Mystical Marrakech: Morocco's Exotic Oasis",
            author: "Amina Khalid",
            country: "Morocco",
            title2: "Marrakech: A Melting Pot of Culture and Tradition",
            body2: `Marrakech, a city that captivates the senses, invites you to explore its colorful souks, aromatic spice markets, and serene gardens. Venture into the Medina, where every alley holds a story, and the vibrant tapestry of Moroccan life unfolds before you.

Discover the architectural marvels of Marrakech, from the intricately decorated Bahia Palace to the majestic Koutoubia Mosque. Visit the Jardin Majorelle, a botanical garden that offers a tranquil retreat with its exotic plants and vibrant colors.

Embrace the flavors of Moroccan cuisine, where dishes like tagine and couscous are not just meals but a celebration of culture and tradition. Savor mint tea in a local riad, and let the warmth of Moroccan hospitality envelop you.

As night falls, the Djemaa el-Fna square comes alive with storytellers, musicians, and performers. Immerse yourself in this living theater, where the pulse of Marrakech beats strongest, and every moment is a doorway to discovery.`,
            img2: "https://images.wallpaperscraft.com/image/single/morocco_souk_bazaar_118959_1920x1080.jpg", // Replace with actual image path for the second article

            caption:
                "Get lost in the bustling souks, visit historic palaces, and savor flavorful Moroccan cuisine in the enchanting city of Marrakech.",
            createdAt: "2024-02-25",
            img: "https://images.wallpaperscraft.com/image/single/morocco_mountains_tops_14966_1600x1200.jpg", // Replace with actual image path
        },
        {
            title: "Charming Cape Town: South Africa's Coastal Gem",
            author: "Sipho Ndlovu",
            title2: "Cape Town: A Symphony of Nature and Culture",
            body2: `Cape Town, nestled between mountains and oceans, offers a mosaic of experiences. Explore the Table Mountain, not just for its panoramic views, but for the rich biodiversity that makes it a unique natural wonder.

Discover the city's cultural heritage at the District Six Museum and Robben Island, where the stories of resilience and struggle are poignantly told. Immerse yourself in the local art scene by visiting the Zeitz MOCAA, a museum dedicated to contemporary African art.

Cape Town's culinary landscape is as diverse as its culture. Sample the local wines in the Cape Winelands, or enjoy the fresh flavors of seafood at a waterfront restaurant.

Embrace the outdoor lifestyle that Cape Town is famous for. Whether it's hiking, surfing, or simply enjoying a sunset on the beach, the city offers countless opportunities to connect with nature and create lasting memories.`,
            img2: "https://images.wallpaperscraft.com/image/single/cape_town_coast_aerial_view_118976_1920x1080.jpg", // Replace with actual image path for the second article

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
