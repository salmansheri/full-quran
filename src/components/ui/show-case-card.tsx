"use client";

import React from "react";
import { Card } from "./card";
import { useRouter } from "next/navigation";

interface ShowCaseCardProps {
  data: any;
  text: string;
}

const ShowCaseCard: React.FC<ShowCaseCardProps> = ({ data, text }) => {
  const router = useRouter();

  const onClick = () => {
    if (text === "surah") {
      router.push(`/surah/${data?.number}`);
    }

    if (text === "juz") {
      router.push(`/juz/${data?.number}`);
    }
  };
  return (
    <Card
      className=" w-full h-[30vh] p-6 flex flex-row cursor-pointer hover:border-white hover:text-white"
      onClick={onClick}
    >
      <div className="w-[30%]">
        <div className="border border-muted w-fit p-6 h-[50%] flex items-center rounded-xl justify-center">
          <h1 className="font-bold text-3xl">{data?.number}</h1>
        </div>
      </div>
      <div className="flex-grow flex flex-row justify-between">
        <div className="space-y-3 flex flex-col">
          <h3 className="text-2xl font-extrabold">{data?.englishName}</h3>
          <p className="text-xl font-medium">{data?.name}</p>
          <p className="text-xl font-semibold">
            {data?.englishNameTranslation}
          </p>
        </div>
        <div>{data?.numberOfAyahs} Ayahs</div>
      </div>
    </Card>
  );
};

export default ShowCaseCard;
