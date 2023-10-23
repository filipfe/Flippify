import { View, ScrollView, Text } from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import HomeHeader from "../components/home/HomeHeader";
import HomeSection from "../components/home/HomeSection";
import StatList from "../components/home/stats/StatList";
import { FavouriteCategory, HomeData, Stat } from "../types/home";
import Hint from "../components/home/Hint";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootTabParams } from "../types/navigation";
import InProgressRef from "../components/home/InProgressRef";
import TaskList from "../components/home/tasks/TaskList";
import { RefreshControl } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import Loader from "../components/ui/Loader";
import { supabase } from "../hooks/useAuth";
import { AuthContext } from "../context/AuthContext";

export default function HomeScreen({
  navigation,
}: BottomTabScreenProps<RootTabParams, "Home">) {
  const { user } = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [categoriesInProgress, setCategoriesInProgress] = useState<
    FavouriteCategory[]
  >([]);
  const [data, setData] = useState<HomeData>({
    stats: [],
  });

  async function fetchData() {
    const stats = await supabase
      .from("stats")
      .select("*")
      .eq("user_id", user.id);
    setData((prev) => ({ ...prev, stats: (stats.data as Stat[]) || [] }));
  }

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    if (!isFocused) return;
    setIsLoading(true);
    async function fetchInitial() {
      await fetchData();
      setIsLoading(false);
    }
    isFocused && fetchInitial();
  }, [isFocused]);

  return isLoading ? (
    <Loader />
  ) : (
    <ScrollView
      contentContainerStyle={{ height: "100%" }}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ paddingVertical: 16 }}>
        <StatList stats={data.stats} />
        <HomeSection title={categoriesInProgress.length > 0 ? "W trakcie" : ""}>
          <View>
            {categoriesInProgress.length > 0 &&
              categoriesInProgress.map((item) => (
                <InProgressRef {...item} key={item.category.id} />
              ))}
          </View>
          <Hint
            text="Rozwiązując fiszki zdobędziesz punkty i odblokujesz dodatkowe bonusy!"
            buttonText="Rozwiązuj fiszki"
            onPress={() =>
              navigation.navigate("Cards", { screen: "CategoryList" })
            }
          />
        </HomeSection>
        <HomeSection title="Wykonuj zadania">
          <TaskList />
        </HomeSection>
      </View>
    </ScrollView>
  );
}
