import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faMapLocation } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { fetcher } from "@/utils/fetcher"; // Assuming fetcher is already set up
import useSWR from "swr";

export default function Status() {
  const [userCount, setUserCount] = useState<number>(0);
  const [accommodationCount, setAccommodationCount] = useState<number>(0);
  const [transportationCount, setTransportationCount] = useState<number>(0);
  const [destinationCount, setDestinationCount] = useState<number>(0);
  const [tourGuideCount, setTourGuideCount] = useState<number>(0);

  const { data, error } = useSWR("/api/statistics", fetcher, {
    refreshInterval: 10000, // Refresh every 10 seconds if you want real-time updates
  });

  useEffect(() => {
    if (data) {
      setUserCount(data.userCount);
      setAccommodationCount(data.accommodationCount);
      setTransportationCount(data.transportationCount);
      setDestinationCount(data.destinationCount);
      setTourGuideCount(data.tourGuideCount);
    }
  }, [data]);

  if (error) return <div>Error loading data.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="w-full relative mt-16">
      <div className="bg-primary absolute w-full -top-16 overflow-y-hidden -z-10">
        <h1 className="text-2xl text-main2 font-roboto px-10 py-14 h-[200px]">
          Statistics
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full px-10 pt-14">
        <div className="bg-white h-[160px] rounded-lg shadow-md shadow-main px-6 py-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h1 className="font-roboto text-xl text-main">Users</h1>
            <FontAwesomeIcon
              icon={faUserAlt}
              className="w-6 h-6 text-primary bg-[#e0dcfe] rounded-md p-2"
            />
          </div>
          <div>
            <p className="font-roboto text-2xl font-bold text-main">{userCount}</p>
            <p className="font-roboto text-sm text-main">Total Users</p>
          </div>
        </div>
        <div className="bg-white h-[160px] rounded-lg shadow-md shadow-main px-6 py-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h1 className="font-roboto text-xl text-main">Providers</h1>
            <FontAwesomeIcon
              icon={faHome}
              className="w-6 h-6 text-primary bg-[#e0dcfe] rounded-md p-2"
            />
          </div>
          <div>
            <p className="font-roboto text-xl font-bold text-main">
              {accommodationCount}{" "}
              <span className="font-roboto text-sm font-normal text-main">
                Accommodations
              </span>
            </p>
            <p className="font-roboto text-xl font-bold text-main">
              {transportationCount}{" "}
              <span className="font-roboto text-sm font-normal text-main">
                Transportation
              </span>
            </p>
          </div>
        </div>
        <div className="bg-white h-[160px] rounded-lg shadow-md shadow-main px-6 py-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h1 className="font-roboto text-xl text-main">Tour guides</h1>
            <FontAwesomeIcon
              icon={faUser}
              className="w-6 h-6 text-primary bg-[#e0dcfe] rounded-md p-2"
            />
          </div>
          <div>
            <p className="font-roboto text-2xl font-bold text-main">
              {tourGuideCount}
            </p>
            <p className="font-roboto text-sm text-main">Total Guides</p>
          </div>
        </div>
        <div className="bg-white h-[160px] rounded-lg shadow-md shadow-main px-6 py-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h1 className="font-roboto text-xl text-main">Destinations</h1>
            <FontAwesomeIcon
              icon={faMapLocation}
              className="w-6 h-6 text-primary bg-[#e0dcfe] rounded-md p-2"
            />
          </div>
          <div>
            <p className="font-roboto text-2xl font-bold text-main">
              {destinationCount}
            </p>
            <p className="font-roboto text-sm text-main">Total Destinations</p>
          </div>
        </div>
      </div>
    </div>
  );
}
