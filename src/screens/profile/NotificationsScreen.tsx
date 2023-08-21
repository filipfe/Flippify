import Layout from "../../components/ui/layout/Layout";
import { SectionList, Text, View } from "react-native";
import { Notification } from "../../types/general";
import { useState, useEffect, useContext, useMemo } from "react";
import { supabase } from "../../hooks/useAuth";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import NotificationRef from "../../components/notifications/NotificationRef";
import Loader from "../../components/ui/Loader";

export default function NotificationsScreen() {
  const { user } = useContext(AuthContext);
  const { secondary } = useContext(ThemeContext);
  const [areLoading, setAreLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    async function fetchNotifications() {
      const { data } = await supabase
        .from("notifications")
        .select("*, initiator:initiator_id(id, username, avatar_url)")
        .eq("receiver_id", user.id);
      setNotifications((data as Notification[]) || []);
      setAreLoading(false);
    }
    fetchNotifications();
  }, []);

  const grouped = useMemo((): { title: string; data: Notification[] }[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const aWeekAgo = new Date(today);
    aWeekAgo.setDate(today.getDate() - 7);

    const aMonthAgo = new Date(today);
    aMonthAgo.setMonth(today.getMonth() - 1);

    return [
      {
        title: "Dzisiaj",
        data: notifications.filter(
          (notification) => new Date(notification.created_at) >= today
        ),
      },
      {
        title: "Wczoraj",
        data: notifications.filter((notification) => {
          const createdAt = new Date(notification.created_at);
          return createdAt >= yesterday && createdAt < today;
        }),
      },
      {
        title: "Tydzień temu",
        data: notifications.filter((notification) => {
          const createdAt = new Date(notification.created_at);
          return createdAt >= aWeekAgo && createdAt < yesterday;
        }),
      },
      {
        title: "Miesiąc temu",
        data: notifications.filter((notification) => {
          const createdAt = new Date(notification.created_at);
          return createdAt >= aMonthAgo && createdAt < aWeekAgo;
        }),
      },
      {
        title: "Wcześniejsze",
        data: notifications.filter((notification) => {
          const createdAt = new Date(notification.created_at);
          return createdAt < aMonthAgo;
        }),
      },
    ];
  }, [notifications]);

  return areLoading ? (
    <Loader />
  ) : (
    <Layout>
      <SectionList
        sections={grouped}
        renderItem={({ item }) => <NotificationRef {...item} />}
        renderSectionHeader={({ section }) =>
          section.data.length > 0 ? (
            <Text
              style={{
                color: secondary,
                fontFamily: "SemiBold",
                marginTop: 4,
                opacity:
                  section.data.length ===
                  section.data.filter((item) => item.was_seen).length
                    ? 0.6
                    : 1,
              }}
            >
              {section.title}
            </Text>
          ) : (
            <></>
          )
        }
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
        SectionSeparatorComponent={() => <View style={{ height: 24 }} />}
        keyExtractor={(item, index) => item.id + index.toString()}
      />
    </Layout>
  );
}
