import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

export default function Footer(){
    return(
        <div className="bg-secondary  mt-10 pt-8 font-serif">
            <div className="flex flex-col xs:flex-row gap-10 lg:gap-20  justify-center items-center xs:items-start">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-main  font-bold text-lg font-serif pb-2">Company</h1>
                    <Link href="/" className="text-main font-sans text-sm">about us</Link>
                    <Link href="/" className="text-main font-sans text-sm"> contact us</Link>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-main font-bold text-lg font-serif pb-2">Usefull Links</h1>
                    <Link href="/" className="text-main font-sans text-sm">Link 1</Link>
                    <Link href="/" className="text-main font-sans text-sm">Link 2</Link>
                    <Link href="/" className="text-main font-sans text-sm">Link 3</Link>
                    <Link href="/" className="text-main font-sans text-sm">Link 4</Link>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-main font-bold text-lg font-serif pb-2">Product</h1>
                    <Link href="/" className="text-main font-sans text-sm">features</Link>
                    <Link href="/" className="text-main font-sans text-sm">pricing</Link>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-main font-bold text-lg font-serif pb-2">Resources</h1>
                    <Link href="/" className="text-main font-sans text-sm">blog</Link>
                    <Link href="/" className="text-main font-sans text-sm">policy</Link>
                    <Link href="/" className="text-main font-sans text-sm">user guide</Link>
                    <Link href="/" className="text-main font-sans text-sm">Help</Link>
                </div>
            </div>
            <div className="py-8">
                <div className="flex gap-2 items-center justify-center">
                <FontAwesomeIcon icon={faCopyright} className="w-4 h-4"/>
                <p>  2025 Brand, inc .Privacy .Terms</p>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}