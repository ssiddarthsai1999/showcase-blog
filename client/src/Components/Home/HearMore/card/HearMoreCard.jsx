import xwhite from "../../../../../src/Assets/xwhite.svg";

export default function HearMoreCard({ data }) {
    return (
        <div className="text-white flex lg:flex-row flex-col w-full items-center justify-center py-[20px] md:py-[60px] flex-wrap mx-auto ">
            {data.map((item) => (
            
                    <a target="blank" href={`${item.linkToPost}`} className="relative mx-auto bg-black border flex hover:shadow-2xl  hover:border-[#3fffff] ease-in duration-100  border-white md:px-10 p-1    pt-10  m-10 md:pb-10  w-[250px] xl:w-[300px]  2xl:w-[30%]   md:min-h-[350px] md:max-h-[350px] min-h-[300px] max-h-[300px]   ">
                        {/* Pseudo-element for notched border */}
                        <div className="notched-border  "></div>
                        <div className="notched-border2  "></div>
                        <div className="flex justify-between  min-w-full pl-3">
                            <div className="justify-start mx-0 flex flex-col  w-[200px] sm:w-full ">
                                <h1 className="mb-2  text-sm sm:text-md md:text-lg ">
                                    {item.title}
                                </h1>
                                <h1 className="mb-4 text-white/40 text-sm sm:text-md md:text-lg ">
                                    {item.handle}
                                </h1>

                                <h3
                                    className="pb-10 md:pb-4 text-left text-[#FFFFFFC9] sm:text-xs text-sm 2xl:text-lg  font-[600] leading-[25px] w-[100%]"
                                    style={{
                                        fontFamily: "SFPRODISPLAYREGULAR",
                                    }}
                                >
                                    {item.description.slice(0, 150)}{" "}
                                    {item.description.length > 150 && "..."}
                                </h3>
                            </div>
                            <div className="">
                                <img
                                    src={xwhite}
                                    className="max-w-[30px] w-[30px]"
                                    alt="icon"
                                />
                            </div>
                        </div>
                    </a>
     
            ))}
        </div>
    );
}
