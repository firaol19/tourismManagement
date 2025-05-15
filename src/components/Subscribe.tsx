

export default function Subscribe(){
    return(
        <div className="mt-4 bg-secondary  flex flex-col justify-center items-center py-20 ">
            <p className="font-extrabold font-serif text-2xl text-main">TOUR APP</p>
            <p className="text-xl font-sans text-main my-5">Subscribe to our Platform</p>
            <div>
            <input type="text" className="focus:outline-none rounded-l-full h-7 pl-4" />
            <span className="bg-main text-text rounded-r-full px-3 py-1 h-18 cursor-pointer">Subscribe</span>
            </div>
        </div>
    )
}