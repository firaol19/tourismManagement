// app/about/page.tsx

import Footer from "@/components/Footer2";
import Image from "next/image";

const About = () => {
  return (
    <div>
        <div className="bg-background dark:bg-background2 text-foreground min-h-screen py-10 px-5 font-roboto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary dark:text-primary2 mb-6 text-center font-serif">About Us</h1>
        <div className="flex flex-col md:flex-row items-center gap-10">
          <Image
            src="/about1.jpg"
            width={600}
            height={400}
            alt="About Us"
            className="rounded-lg shadow-lg"
          />
          <div className="space-y-6 text-lg">
            <p className="text-main dark:text-text2">
              Welcome to our Tourism Management System, where we aim to provide unforgettable experiences and seamless travel planning for all our clients. Our dedicated team of professionals works tirelessly to ensure that every detail of your journey is meticulously planned and executed.
            </p>
            <p className="text-main dark:text-text2">
              Whether you are seeking adventure, relaxation, or cultural exploration, we have a wide range of tour packages tailored to meet your needs. From breathtaking landscapes to historical landmarks, we strive to offer the best that each destination has to offer.
            </p>
            <p className="text-main dark:text-text2">
              Our mission is to create memorable travel experiences that inspire and enrich the lives of our clients. We believe in the transformative power of travel and are committed to delivering exceptional service and unforgettable journeys.
            </p>
            <p className="text-main dark:text-text2">
              Join us on a journey of discovery and let us help you explore the worlds wonders. Your adventure begins here!
            </p>
          </div>
        </div>
      </div>
      
    </div>
    <Footer/>
    </div>
  );
};

export default About;
