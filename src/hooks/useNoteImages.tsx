import { useState } from "react";

export default function useNoteImages<T>() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [images, setImages] = useState<T[]>([]);
  return {
    images,
    setImages,
    activeIndex,
    setActiveIndex,
  };
}
