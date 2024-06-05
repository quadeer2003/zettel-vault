import Image from "next/image";

export const Heroes = () =>{
    return(
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex items-center">
                <div className="relative w-[320px] h-[320px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[600px]">
                    <Image 
                        src="/hero3.png"
                        fill
                        className="object-contain dark:hidden"
                        alt="Documents"
                    />
                    <Image 
                        src="/hero3_dark.png"
                        fill
                        className="object-contain hidden dark:block"
                        alt="Documents"
                    />
                

                </div>
            </div>
        </div>
    )
}
