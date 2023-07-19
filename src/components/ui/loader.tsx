import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center my-10">
      <Loader2 className="h-20 w-20 animate-spin" />
    </div>
  );
};

export default Loader;
