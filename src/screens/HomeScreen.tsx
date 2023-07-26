import { View, ScrollView } from "react-native";
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
import { AuthContext } from "../context/AuthContext";
import TaskList from "../components/home/tasks/TaskList";

export default function HomeScreen({
  navigation,
}: BottomTabScreenProps<RootTabParams, "Home">) {
  const [categoriesInProgress, setCategoriesInProgress] = useState<
    FavouriteCategory[]
  >([]);
  const [proposedUsers, setProposedUsers] = useState<ProposedUser[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await supabase.rpc("home_recommendations", {
        user_id: user.id,
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
        <HomeSection title="Wykonuj zadania">
          <TaskList />
        </HomeSection>
        {proposedUsers.map(
          (user) =>
            user.notes && (
              <UserSection {...user} key={"user-section:" + user.id} />
            )
        )}
      </View>
    </ScrollView>
  );
}
