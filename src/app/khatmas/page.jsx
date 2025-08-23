"use client";
import useKhatmaStore from "@/stores/khatmasStore";
import GroupKhatmas from "../../components/khatmas/KhatmasListing/KhatmasListing";
import { useEffect, useState } from "react";

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
    <div className="h-full overflow-hidden ">
      {isLoading ? (
        <div className="flex justify-center pt-8 text-[var(--g-color)]">
          Loading kahtmas...
        </div>
      ) : (
        <GroupKhatmas />
      )}
    </div>
  );
};

export default Page;
