import Image from "next/image";

export const Logo = () =>{
    return(
        <div className="hiden md:flex items-center">
            <Image 
                src="/header_logo.png"
                height="60"
                width="60"
                alt='logo'

            />
        </div>
    )
}