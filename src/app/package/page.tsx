// app/package/page.tsx

import Footer2 from '@/components/Footer2';
import Image from 'next/image';
import Link from 'next/link';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { getAllPackages } from '@/lib/action';
import { getServerSession } from 'next-auth';

//import { redirect } from 'next/navigation';

export default async function Package() {


    const session = await getServerSession(authOptions)

    if (!session) {
        //console.log("test");
        //redirect("/auth/login");
      }

  
  const packages = await getAllPackages();

  return (
    <>
      <div className="mx-2 md:mx-10 mt-6 z-[-2] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {packages.map((pkg) => (
          <div key={pkg.id}>
            <div className="shadow-lg shadow-text dark:shadow-text2 p-1 rounded-lg ">
              <Image
                src={pkg.image}
                width={400}
                height={200}
                alt="destination"
                className="w-full h-[250px] object-cover rounded-md"
              />
              <div className="flex flex-col justify-center items-center py-4">
                <h1 className="text-primary dark:text-primary2 text-xl md:text-2xl lg:3xl font-serif">
                  {pkg.title}
                </h1>
                
                <div className="flex flex-col justify-center items-start px-4 mt-5">
                  <p className="text-sm text-main dark:text-text2 font-sans pb-3"><span className="text-primary font-bold">Duration :</span> {pkg.duration}</p>
                  <p className="text-sm text-main dark:text-text2 font-sans pb-3"><span className="text-primary font-bold">Place :</span> {pkg.place}</p>
                  <p className="text-sm text-main dark:text-text2 font-sans pb-3"><span className="text-primary font-bold">Price :</span> {pkg.price}</p>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Link href={`/packageDetail/${pkg.id}`} className="bg-main dark:bg-primary rounded-lg text-text px-4 py-2 font-sans mt-4 cursor-pointer">
                    Details
                  </Link>
                  <Link href={`/packageBook/${pkg.id}`} className="bg-main dark:bg-primary rounded-lg text-text px-4 py-2 font-sans mt-4 cursor-pointer">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer2 />
    </>
  );
}
