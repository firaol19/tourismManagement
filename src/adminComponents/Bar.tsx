import Dropdown from "./DropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import LogoutButton from "@/components/Logout_button";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";

const data1 = [
    {
        link: "/register/3",
        name: "Accommodation"
    },
    {
        link: "/register/2",
        name: "Transportation"
    },
    {
        link: "/register/1",
        name: "Destination"
    },
    {
        link: "/register/4",
        name: "Tour Guide"
    },
    {
        link: "/register/5",
        name: "Package"
    },
    
]
const data2 = [
    {
        link: "/payments",
        name: "Pay for Provider"
    }
]
const data3 = [
    {
        link: "/list/3",
        name: "Accommodation"
    },
    {
        link: "/list/2",
        name: "Transportation"
    },
    {
        link: "/list/1",
        name: "Destination"
    },
    {
        link: "/list/4",
        name: "Tour Guide"
    },
    
]
const data4 = [
    {
        link: "/bookedService",
        name: "Booked Services"
    },
    {
        link: "/BookedPackages",
        name: "Booked Packages"
    },
    
]

export default function Bar(){
    return(
        <div className="w-full h-screen bg-secondary px-8 py-8 transition-all duration-200 flex flex-col overflow-y-hidden">
            <h1 className="font-extrabold font-serif text-2xl text-main2 mb-5">TOUR APP</h1>
            <Link href="/admin" className=" text-main2 font-roboto text-lg">
                <FontAwesomeIcon icon={faHome} className="w-5 h-5 text-main2 pr-3"/>
                Dashboard
            </Link>
            <p className="font-roboto text-lg text-[#454f5b] my-5">Management</p>
            <Dropdown data={data1} title="Register"/>
            <Dropdown data={data2} title="Billing"/>
            <Dropdown data={data3} title="Lists"/>
            <Dropdown data={data4} title="Bookings"/>   
            <LogoutButton/>
            
        </div>
    )
}