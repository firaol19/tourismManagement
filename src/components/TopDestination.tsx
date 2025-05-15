import DestinationSlide from "./DestinationSlide";

export default function Destination(){
    return(
        <div className="px-2 md:px-10 lg:px-20 mt-8 md:mt-16">
            <h2 className="text-3xl font-serif text-main dark:text-primary mb-10 hidden md:block">
                Explore Ethiopia`s Top Destinations
            </h2>
            <h2 className="text-3xl font-serif text-main dark:text-primary mb-10 md:hidden">
                Top Destinations
            </h2>
            <DestinationSlide/>
        </div>
    )
}