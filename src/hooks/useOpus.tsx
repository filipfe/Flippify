import { API_URL } from "@env";
import axios from "axios";
import { useEffect, useState } from "react";
import { Category } from "../types/general";
import { Topic } from "../types/flashcards";
import { initialCategory } from "../const/flashcards";
import { OpusContext } from "../context/OpusContext";

export default function useOpus<T>(initialValue: T): OpusContext<T> {
  const [item, setItem] = useState<T>(initialValue);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [areTopicsLoading, setAreTopicsLoading] = useState(false);
  const [activeCategory, setActiveCategory] =
    useState<Category>(initialCategory);

  useEffect(() => {
    setTopics([]);
    if (activeCategory.id === -1) return;
    setAreTopicsLoading(true);
    let isCancelled = false;
    !isCancelled &&
      axios
        .get(`${API_URL}/api/topics/${activeCategory.id}`)
        .then((res) => res.data)
        .then((data) => setTopics(data))
        .finally(() => setAreTopicsLoading(true));
    return () => {
      isCancelled = true;
    };
  }, [activeCategory]);

  const changeCategory = (category: Category) => {
    setActiveCategory(category);
    setItem((prev) => ({ ...prev, category }));
  };

  return {
    topics,
    item,
    setItem,
    activeCategory,
    changeCategory,
    areTopicsLoading,
  };
}
