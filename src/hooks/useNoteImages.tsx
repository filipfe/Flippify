import { useState } from "react";

export default function useNoteImages<T>(initialIndex?: number) {
  const [activeIndex, setActiveIndex] = useState(initialIndex || 0);
  const [images, setImages] = useState<T[]>([]);
  return {
    images,
    setImages,
    activeIndex,
    setActiveIndex,
  };
}
