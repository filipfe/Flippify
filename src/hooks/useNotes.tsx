import { useState, useEffect, useContext } from "react";
import { Filter, Note } from "../types/notes";
import { supabase } from "./useAuth";
import { AuthContext } from "../context/AuthContext";

export default function useNotes({ category, search }: Filter) {
  const [didInitialLoad, setDidInitialLoad] = useState(false);
  const [areSearchedLoading, setAreSearchedLoading] = useState(false);
  const [popularNotes, setPopularNotes] = useState<Note[]>([]);
  const [recentNotes, setRecentNotes] = useState<Note[]>([]);
  const [searchedNotes, setSearchedNotes] = useState<Note[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await supabase.rpc("get_notes", { p_user_id: user.id });
      setRecentNotes((data["recent_notes"] as Note[]) || []);
      setPopularNotes((data["popular_notes"] as Note[]) || []);
      setDidInitialLoad(true);
    };
    fetchNotes();
  }, []);

  useEffect(() => {
    if (!search) return;
    setAreSearchedLoading(true);
    setSearchedNotes([]);
    const fetchNotes = async () => {
      const { data } = await supabase.rpc("get_notes", {
        p_user_id: user.id,
        p_search: search,
        p_page: 1,
      });
      setSearchedNotes((data as Note[]) || []);
      setAreSearchedLoading(false);
    };
    fetchNotes();
  }, [search]);

  return {
    areSearchedLoading,
    searchedNotes,
    didInitialLoad,
    popularNotes,
    recentNotes,
  };
}
