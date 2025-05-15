
"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShowDestination from './ShowDestination';
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

//import Link from "next/link";





//import Image from "next/image";






//import { getAllDestinations, getDestinationsByCategory } from '@/lib/actions';



const ShowDestinationServer =  () => {

  const [category, setCategory] = useState("")
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  
  

  return (    
    <div className=" bg-[#E8DFC8] dark:bg-accent  px-2 md:px-10 lg:px-20 py-2 z-50">           
            <div className="hidden lg:flex justify-between">               
                  <span onClick={() => setCategory("Historical")} className="text-primary dark:text-text2 font-serif cursor-pointer shadow-md shadow-primary dark:shadow-primary2 px-6 rounded-md py-3 text-xl">Historical</span>               
                  <span onClick={() => setCategory("Religious")} className="text-primary dark:text-text2 font-serif cursor-pointer shadow-md shadow-primary dark:shadow-primary2 px-6 rounded-md py-3 text-xl">Religious</span>               
                  <span onClick={() => setCategory("Natural")} className="text-primary dark:text-text2 font-serif cursor-pointer shadow-md shadow-primary dark:shadow-primary2 px-6 rounded-md py-3 text-xl">Natural</span>
                  <span onClick={() => setCategory("Wildlife")} className="text-primary dark:text-text2 font-serif cursor-pointer shadow-md shadow-primary dark:shadow-primary2 px-6 rounded-md py-3 text-xl">Wild Life</span>
                  <span onClick={() => setCategory("Cultural")} className="text-primary dark:text-text2 font-serif cursor-pointer shadow-md shadow-primary dark:shadow-primary2 px-6 rounded-md py-3 text-xl">Cultural</span>              
                  <span onClick={() => setCategory("Geological")} className="text-primary dark:text-text2 font-serif cursor-pointer shadow-md shadow-primary dark:shadow-primary2 px-6 rounded-md py-3 text-xl">Geological</span>
                  <span onClick={() => setCategory("Urban")} className="text-primary dark:text-text2 font-serif cursor-pointer shadow-md shadow-primary dark:shadow-primary2 px-6 rounded-md py-3 text-xl">Urban</span>
              </div>
              <div className="lg:hidden relative flex items-center justify-center">
                  <div className="flex gap-4 items-center justify-center py-2 z-[2] bg-[#E8DFC8] dark:bg-accent cursor-pointer" onClick={handleToggle}>
                      <p className="text-xl font-roboto text-main dark:text-text2">Categorical Filter</p>
                      <FontAwesomeIcon icon={faAngleDown} className={`w-6 h-6 text-main dark:text-text2 ${isOpen ? "hidden" : "inline"}`}/>
                      <FontAwesomeIcon icon={faAngleUp} className={`w-6 h-6 text-main dark:text-text2 ${isOpen ? "inline" : "hidden"}`}/>
                  </div>
                  <div className={`flex flex-col duration-200 items-center justify-center bg-[#E8DFC8] dark:bg-accent rounded-b-lg w-[250px] absolute z-[0] ${isOpen ? "top-12" : "-top-[3000px]"} `}>
                      <span onClick={() => setCategory("Historical")} className="text-primary dark:text-text2 font-serif cursor-pointer  px-6 rounded-md py-3 text-lg md:text-xl">Historical</span>
                      <span onClick={() => setCategory("Religious")} className="text-primary dark:text-text2 font-serif cursor-pointer  px-6 rounded-md py-3 text-lg md:text-xl">Religious</span>
                      <span onClick={() => setCategory("Natural")}  className="text-primary dark:text-text2 font-serif cursor-pointer  px-6 rounded-md py-3 text-lg md:text-xl">Natural</span>
                      <span onClick={() => setCategory("Wildlife")} className="text-primary dark:text-text2 font-serif cursor-pointer  px-6 rounded-md py-3 text-lg md:text-xl">Wild Life</span>
                      <span onClick={() => setCategory("Cultural")} className="text-primary dark:text-text2 font-serif cursor-pointer  px-6 rounded-md py-3 text-lg md:text-xl">Cultural</span>
                      <span onClick={() => setCategory("Geological")} className="text-primary dark:text-text2 font-serif cursor-pointer  px-6 rounded-md py-3 text-lg md:text-xl">Geological</span>
                      <span onClick={() => setCategory("Urban")} className="text-primary dark:text-text2 font-serif cursor-pointer  px-6 rounded-md py-3 text-lg md:text-xl">Urban</span>
                  </div>
              </div>
              <ShowDestination category={category} />
          </div>
  )
  
  
  
};

export default ShowDestinationServer;
