import { useState } from "react";

export default function useNoteImages<T>(
  initialIndex?: number,
  isModification?: boolean
) {
  const [modificationImages, setModificationImages] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(initialIndex || 0);
  const [images, setImages] = useState<T[]>([]);

  const addImage = (image: T) => {
    setImages((prev) => [...prev, image]);
    isModification && setModificationImages((prev) => [...prev, images.length]);
  };

  return {
    images,
    setImages,
    modificationImages,
    activeIndex,
    setActiveIndex,
    addImage,
  };
}
