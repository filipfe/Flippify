import Layout from "../../components/Layout";
import { SectionList } from "react-native";
import { Notification } from "../../types/general";
import { useState, useEffect, useContext } from "react";
import { supabase } from "../../hooks/useAuth";
import { AuthContext } from "../../context/AuthContext";
import TimeFrameSection from "../../components/notifications/TimeFrameSection";

export default function NotificationsScreen() {
  const { user } = useContext(AuthContext);
  const [areLoading, setAreLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    async function fetchNotifications() {
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setNotifications((data as Notification[]) || []);
    }
    fetchNotifications();
  }, []);

  return (
    <Layout>
      <SectionList
        sections={[
          { title: "Dzisiaj", data: notifications },
          { title: "Wczoraj", data: notifications },
        ]}
        renderItem={({ item }) => <></>}
        keyExtractor={(item, index) => item.id + index.toString()}
      />
    </Layout>
  );
}
