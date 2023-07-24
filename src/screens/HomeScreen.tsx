import { View, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { useContext, useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import HomeHeader from "../components/home/HomeHeader";
import HomeLevel from "../components/home/HomeLevel";
import HomeSection from "../components/home/HomeSection";
import { supabase } from "../hooks/useAuth";
import { AuthContext } from "../context/AuthContext";
import RecentNotes from "../components/home/RecentNotes";

export default function HomeScreen() {
  const { user } = useContext(AuthContext);
  const { background } = useContext(ThemeContext);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.rpc("total_views");
      console.log({ data, error });
      console.log(data[2].notes);
    };
    fetchUsers();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={[styles.flex, { backgroundColor: background }]}
    >
      <HomeHeader />
      <View>
        <View style={styles.firstChild}>{/* <HomeLevel /> */}</View>
        <HomeSection title="Ostatnie notatki" padding={false}>
          <RecentNotes />
        </HomeSection>
        <HomeSection title="Ulubione kategorie">
          <View></View>
        </HomeSection>
        <HomeSection title="Ostatnie notatki">
          <View></View>
        </HomeSection>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  firstChild: {
    marginBottom: 24,
  },
});
