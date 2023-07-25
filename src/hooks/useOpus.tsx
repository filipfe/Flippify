import axios from "axios";
import { useEffect, useState } from "react";
import { Category } from "../types/general";
import { Topic } from "../types/flashcards";
import { initialCategory } from "../const/flashcards";
import { OpusContext } from "../context/OpusContext";
import { supabase } from "./useAuth";

export default function useOpus<T>(initialValue: T): OpusContext<T> {
  const [item, setItem] = useState<T>(initialValue);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [areTopicsLoading, setAreTopicsLoading] = useState(false);
  const [activeCategory, setActiveCategory] =
    useState<Category>(initialCategory);

  useEffect(() => {
    setTopics([]);
    if (!activeCategory.id) return;
    setAreTopicsLoading(true);
    async function fetchTopic() {
      const { data } = await supabase
        .from("topics")
        .select("*")
        .eq("category_id", activeCategory.id);
      setTopics((data as Topic[]) || []);
      setAreTopicsLoading(false);
    }
    let isCancelled = false;
    !isCancelled && fetchTopic();

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
