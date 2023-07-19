"use client";

import EmptyState from "@/components/ui/empty-state";
import Loader from "@/components/ui/loader";
import { url } from "@/lib/url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function SurahPage({
  params,
}: {
  params: { surahNumber: string };
}) {
  const {
    data: ayahs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ayah", params.surahNumber],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/surah/${params.surahNumber}`);
      return data.data.ayahs;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <EmptyState title="Cannot Find" description="Something Went wrong" />
    );
  }

  return (
    <div>
      <div className="container">{JSON.stringify(ayahs)}</div>
    </div>
  );
}
