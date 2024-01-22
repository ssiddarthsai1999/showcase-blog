// import { useState } from "react";

// export default function ExploreCard({ data }) {
//     const[ isHover,setIsHover]= useState(false)
//     return (
//         <div className="text-white items-center justify-center py-[20px] md:py-[100px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {data.map((item, index) => (
//                 <a
//                     onMouseEnter={() => setIsHover(index)}
//                     onMouseLeave={() => setIsHover(null)}
//                     key={index}
//                     target="blank"
//                     href={`${item.linkToPost}`} // Replace with your actual link path
//                     className={`  cursor-pointer block w-[90%] relative max-h-[200px] h-full md:max-h-full mx-auto md:w-full aspect-w-1 aspect-h-1 bg-bottom bg-no-repeat border-transparent border hover:border-[#3fffff] ease-in duration-100 ${
//                         index === 0
//                             ? "col-span-1 md:row-span-2 row-span-1 h-full"
//                             : "col-span-1 row-span-1 md:h-[300px]"
//                     }`}
//                 >
//                     <img
//                         src={item.image}
//                         alt="im"
//                         width={300} // Set your desired width
//                         height={300} // Set your desired height
//                         className="w-full h-full hover:opacity-20  "
//                     />
//                     {isHover === index && (
//                         <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none duration-100 ease-in">
//                             <h2 className=" text-[20px] text-[#3fffff]  lg:text-[30px] text-center">
//                                 Visit post on Instagram
//                             </h2>
//                         </div>
//                     )}
//                     <div
//                         style={{ pointerEvents: "none" }}
//                         className="border-white border p-1 rounded-[50%] absolute right-3 top-4 bg-black/40"
//                     >
//                         <img src={item.icon} alt="icon" className="w-5 " />
//                     </div>
//                 </a>
//             ))}
//         </div>
//     );
// }

import { useState } from "react";

export default function ExploreCard({ data }) {
    const [isHover, setIsHover] = useState(false);
    return (
        <div className="text-white flex gap-10 flex-wrap pt-[50px]  md:pt-[100px] justify-center items-center">
            {data.map((item, index) => (
                <div
                    key={index}
                    className={`flex cursor-pointer relative w-[400px] h-[400px] border-transparent border hover:border-[#3fffff] ease-in duration-100`}
                    onMouseEnter={() => setIsHover(index)}
                    onMouseLeave={() => setIsHover(null)}
                >
                    <a target="blank" href={`${item.linkToPost}`}>
                        <img
                            src={item.image}
                            alt="im"
                            className="w-full h-full hover:opacity-20"
                        />
                        {isHover === index && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h2 className="text-[20px] text-[#3fffff] lg:text-[30px] text-center">
                                    Visit post on Instagram
                                </h2>
                            </div>
                        )}
                        <div className="absolute top-4 right-3 border-white border p-1 rounded-[50%] bg-black/40">
                            <img src={item.icon} alt="icon" className="w-5" />
                        </div>
                    </a>
                </div>
            ))}
        </div>
    );
}
