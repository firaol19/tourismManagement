import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import LogoutButton from "@/components/Logout_button";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";

export default function Bar(){
    return(
        <div className="w-full h-screen bg-secondary px-8 py-8 transition-all duration-200 flex flex-col overflow-y-hidden">
            <h1 className="font-extrabold font-serif text-2xl text-main2 mb-5">TOUR APP</h1>
            <Link href="/c_service" className=" text-main2 font-roboto text-lg">
                <FontAwesomeIcon icon={faHome} className="w-5 h-5 text-main2 pr-3"/>
                CS Dashboard
            </Link>
            
            <p className="font-roboto text-lg text-[#454f5b] my-5">Support User</p>
            <Link href="/message" className="font-roboto text-lg text-primary2 my-5">Chat Support</Link>
            <LogoutButton/>
        </div>
    )
}