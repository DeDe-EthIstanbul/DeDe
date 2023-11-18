import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import loadedImage from "../../public/assets/penguin_loaded.png";
import loadingImage from "../../public/assets/penguin_loading.png";

const BouncingLoader = ({
  isInTransaction,
  setInTransaction,
  isLoading,
}: {
  isInTransaction: boolean;
  setInTransaction: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}) => {
  let [currentState, setState] = useState<"rest" | "loading" | "loaded">(
    "rest"
  );
  console.log("🚀 | currentState:", currentState);

  useEffect(() => {
    if (!isInTransaction) {
      setState("loaded");
    } else if (isInTransaction) {
      setState("loading");
    } else {
      setState("rest");
    }
  }, [currentState, isInTransaction, setInTransaction, isLoading]);

  const imageClass =
    currentState === "loading"
      ? "w-28 h-auto animate-custom-bounce" // 64x64 pixels and custom bounce
      : "w-28 h-auto opacity-0 transition-opacity duration-1000"; // 64x64 pixels and fade out

  return (
    <div className="flex justify-center align-middle ">
      <Image
        src={currentState === "loading" ? loadingImage : loadedImage}
        alt="Animated Image"
        className={imageClass}
      />
    </div>
  );
};

export default BouncingLoader;
