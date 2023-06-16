import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import React, { useContext } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import useNotes from "../../hooks/useNotes";
import { NoteStackParams } from "../../types/notes";
import Loader from "../Loader";
import { ThemeContext } from "../../context/ThemeContext";
import BoxLink from "../BoxLink";
import Layout from "../Layout";

const NoteList = ({
  route,
}: {
  route: RouteProp<NoteStackParams, "NoteList">;
}) => {
  const { navigate } =
    useNavigation<NavigationProp<NoteStackParams, "NoteList">>();
  const { background } = useContext(ThemeContext);
  const {
    didInitialLoad,
    didSearchedLoad,
    SearchedNotes,
    PopularNotes,
    RecentNotes,
  } = useNotes(route.params.search);
  // const [notes, setNotes] = useState<Note[]>([]);
  // const [filter, setFilter] = useState<Filter>({
  //   category: "Wszystkie",
  //   search: "",
  // });

  // useEffect(() => {
  //   let categoryStr: string =
  //     filter.category !== "Wszystkie" ? "&c=" + filter.category : "";
  //   axios
  //     .get(`${API_URL}/api/notes${categoryStr}`)
  //     .then((res) => res.data)
  //     .then((data) => setNotes([...data.popular, ...data.recent]));
  // }, [filter, location]);

  return didInitialLoad ? (
    <Layout paddingHorizontal={0}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ ...styles.wrapper, backgroundColor: background }}>
          {route.params.search && didSearchedLoad && <SearchedNotes />}
          <PopularNotes />
          <RecentNotes />
          {/* {!loading ? (
        notes.map((note) => <NoteRef {...note} key={note.id} />)
      ) : (
        <Loader />
      )} */}
          <View style={{ paddingHorizontal: 24 }}>
            <BoxLink
              navigate={() => navigate("OwnNotes")}
              title="Moje notatki"
              subtitle="24"
              icon="✏"
            />
          </View>
        </View>
      </ScrollView>
    </Layout>
  ) : (
    <Loader />
  );
};

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 24,
    minHeight: height,
  },
});

export default NoteList;
