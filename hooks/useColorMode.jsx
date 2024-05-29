"use client";
import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");
  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    colorMode === "dark"
      ? bodyClass.add(className)
      : bodyClass.remove(className);
    
    // Dispatch event only when colorMode changes
    window.dispatchEvent(new Event("themeChange"));
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
