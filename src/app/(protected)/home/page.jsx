"use client";

import useKhatmaStore from "../../../stores/khatmasStore";
import { useEffect, useState } from "react";
import KhatmaListingHome from "../../../components/home/KhatmasListingHome";

const Page = () => {
  const [isLoading, setIsLoading] = useState();
  const { userKhatmas, fetchUserKhatmas } = useKhatmaStore();

  useEffect(() => {
    const fetch = async () => {
      try {
        await fetchUserKhatmas();
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
    console.log("Done");
  }, []);

  useEffect(() => {
    userKhatmas ? setIsLoading(false) : setIsLoading(true);
    console.log("userkhatmas are : ", userKhatmas);
  }, [userKhatmas]);

  return (
    <div className="w-screen h-screen">
      {isLoading ? (
        <div className="flex justify-center pt-8 text-[var(--g-color)]">
          Loading kahtmas...
        </div>
      ) : (
        <KhatmaListingHome khatmas={userKhatmas} />
      )}
    </div>
  );
};

export default Page;
