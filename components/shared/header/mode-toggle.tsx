"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  SunIcon,
  MoonIcon,
  SunMoon,
  Coffee,
  Flower,
  Flower2,
  Trees,
} from "lucide-react";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const themes = ["light", "dark", "system","cafe", "light2", "dark2","forest" ];

  const handleToggle = () => {
    const currentIndex = themes.indexOf(theme!);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  const renderIcon = () => {
    switch (theme) {
      case "dark":
        return <MoonIcon />;
      case "light":
        return <SunIcon />;
      case "system":
        return <SunMoon />;
         case "cafe":
        return <Coffee />;
      case "light2":
        return <Flower />;
      case "dark2":
        return <Flower2 />;
      case "forest":
        return <Trees />;
     
    }
  };

  return (
    <Button variant="ghost" onClick={handleToggle}>
      {renderIcon()}
    </Button>
  );
}
