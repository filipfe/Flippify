import { View, ScrollView } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { useContext, useEffect, useState } from "react";
import HomeHeader from "../components/home/HomeHeader";
import HomeSection from "../components/home/HomeSection";
import { supabase } from "../hooks/useAuth";
import RecentNotes from "../components/home/RecentNotes";
import StatList from "../components/home/stats/StatList";
import { FavouriteCategory, ProposedUser } from "../types/home";
import UserSection from "../components/home/UserSection";
import Hint from "../components/home/Hint";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootTabParams } from "../types/navigation";
import InProgressRef from "../components/home/InProgressRef";

export default function HomeScreen({
  navigation,
}: BottomTabScreenProps<RootTabParams, "Home">) {
  const [categoriesInProgress, setCategoriesInProgress] = useState<
    FavouriteCategory[]
  >([]);
  const [proposedUsers, setProposedUsers] = useState<ProposedUser[]>([]);
  // const { user } = useContext(AuthContext);
  const { background } = useContext(ThemeContext);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await supabase.rpc("home_recommendations", {
        user_id: 1,
      });
      data && setProposedUsers(data as ProposedUser[]);
    };
    async function fetchCategories() {
      setCategoriesInProgress([
        {
          category: {
            id: 10,
            name: "Matematyka",
            icon: "",
          },
          topic: {
            id: 9,
            name: "Topologia",
          },
        },
      ]);
    }
    fetchUsers();
    fetchCategories();
  }, []);

  return (
    <ScrollView>
      <HomeHeader />
      <View style={{ paddingVertical: 16 }}>
        <StatList />
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
              navigation.navigate("FlashCards", { screen: "CategoryList" })
            }
          />
        </HomeSection>
        <HomeSection title="Ostatnie notatki" padding={false}>
          <RecentNotes />
        </HomeSection>
        {proposedUsers.map(
          (user) => user.notes && <UserSection {...user} key={user.id} />
        )}
      </View>
    </ScrollView>
  );
}
