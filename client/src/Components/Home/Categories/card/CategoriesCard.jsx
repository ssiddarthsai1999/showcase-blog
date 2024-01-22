
export default function CategoriesCard({ data }) {
    return (
        <div className="text-white items-center justify-around py-2 pt-10  md:py-[100px] flex gap-4 flex-wrap">
            {data.map((item, index) => (
                <div
                    key={index}
                    className="bg-black border border-white h-[150px] w-[300px] md:h-[350px] md:w-[500px] flex relative"
                >
                    <img
                        src={item.image}
                        alt="im"
                        width={1000} // Set your desired width
                        height={1000} // Set your desired height
                        className="object-cover w-full h-full"
                    />
                    <h3 className="absolute inset-0 flex items-center justify-center text-white">
                        {item.title}
                    </h3>
                </div>
            ))}
        </div>
    );
}
