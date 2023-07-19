"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import ShowCaseCard from "./ui/show-case-card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { url } from "@/lib/url";
import { notFound } from "next/navigation";
import Loader from "./ui/loader";
import EmptyState from "./ui/empty-state";

const Hero = () => {
  const [tabText, setTabText] = useState<string>("surah");
  const {
    data: surahs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["surahs", tabText],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/${tabText}`);
      return data.data;
    },
  });

  return (
    <div>
      <div className="w-full border-b border-muted flex flex-row space-x-5">
        <span
          onClick={() => setTabText("surah")}
          className={cn(
            tabText === "surah"
              ? "border-b-2 dark:border-white border-black "
              : "border-none",
            "cursor-pointer",
          )}
        >
          Surah
        </span>
        <span
          onClick={() => setTabText("juz")}
          className={cn(
            tabText === "juz"
              ? "border-b-2 dark:border-white border-black "
              : "border-none",
            "cursor-pointer",
          )}
        >
          Juz
        </span>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="py-5 px-2 grid grid-cols-1 md:grid-cols-3  place-items-center gap-4">
          {isError ? (
            <EmptyState
              title="Cannot Find"
              description="Something went wrong"
            />
          ) : (
            <>
              {surahs?.map((surah: any) => (
                <ShowCaseCard key={surah?.number} data={surah} text={tabText} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Hero;
