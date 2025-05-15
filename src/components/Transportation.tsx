import Image from "next/image"

export default function Transportation(){
    return(
        <div className="mx-2 md:mx-10 lg:mx-20 mt-12 flex flex-col items-center">
            <h1 className="text-main dark:text-primary2 text-xl  md:text-3xl font-serif">Transportation Options</h1>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 mt-12">
                <div className="w-full ">
                    <Image src="/bus.jpg" width={500} height={500} alt="car" className="w-full aspect-square rounded-full"/>
                    <div className="flex flex-col justify-center items-center mt-4">
                        <h2 className="text-primary dark:text-primary2 font-serif text-lg lg:text-3xl">Public Transport</h2>
                        <p className="lg:text-sm text-xs text-main dark:text-main2 font-sans pt-1">Description</p>
                    </div>
                </div>
                <div className="w-full">
                    <Image src="/car.jpg" width={500} height={500}  alt="car" className="w-full aspect-square rounded-full"/>
                    <div className="flex flex-col justify-center items-center mt-4">
                        <h2 className="text-primary dark:text-primary2 font-serif text-lg lg:text-3xl">Private Transport</h2>
                        <p className="lg:text-sm text-xs text-main dark:text-main2 font-sans pt-1">Description</p>
                    </div>
                </div>
                <div className="w-full xs:mx-[50%] xs:pl-5 sm:mx-0 sm:pl-0">
                    <Image src="/plan.jpg" width={500} height={500} alt="car" className="w-full aspect-square rounded-full"/>
                    <div className="flex flex-col justify-center items-center mt-4 ">
                        <h2 className="text-primary dark:text-primary2 font-serif text-lg lg:text-3xl">Air Transport</h2>
                        <p className="lg:text-sm text-xs text-main dark:text-main2 font-sans pt-1">Description</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}