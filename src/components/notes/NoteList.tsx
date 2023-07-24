import React, { useContext } from "react";
import { Dimensions, Text, View } from "react-native";
import useNotes from "../../hooks/useNotes";
import Loader from "../Loader";
import { ThemeContext } from "../../context/ThemeContext";
import BoxLink from "../BoxLink";
import Layout from "../Layout";
import { NotesIcon } from "../../assets/general";
import { NoteStackParams } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { initialFilter } from "../../const/notes";
import { FlatList } from "react-native-gesture-handler";
import NoteRef from "./NoteRef";

const NoteList = ({
  route,
  navigation,
}: NativeStackScreenProps<NoteStackParams, "NoteList">) => {
  const { navigate } = navigation;
  const { secondary, font } = useContext(ThemeContext);
  const {
    didInitialLoad,
    areSearchedLoading,
    searchedNotes,
    PopularNotes,
    RecentNotes,
  } = useNotes(route.params);

  return didInitialLoad ? (
    <Layout paddingHorizontal={0} paddingVertical={0}>
      <FlatList
        data={searchedNotes}
        numColumns={2}
        contentContainerStyle={{ paddingVertical: 24, marginBottom: 24 }}
        renderItem={({ item }) => <NoteRef {...item} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          route.params.search ? (
            <Text
              style={{
                fontFamily: "ExtraBold",
                marginBottom: 24,
                fontSize: 22,
                paddingHorizontal: 24,
                color: font,
              }}
            >
              Szukane “{route.params.search}”
            </Text>
          ) : (
            <></>
          )
        }
        ListEmptyComponent={
          route.params.search ? (
            areSearchedLoading ? (
              <Loader />
            ) : (
              <Text
                style={{
                  color: secondary,
                  fontFamily: "SemiBold",
                  fontSize: 14,
                  lineHeight: 14,
                  paddingHorizontal: 24,
                }}
              >
                Nie znaleziono wyników wyszukiwania
              </Text>
            )
          ) : (
            <></>
          )
        }
        ListFooterComponent={
          <View style={{ marginTop: route.params.search ? 48 : 0 }}>
            <PopularNotes />
            <View style={{ marginVertical: 48 }}>
              <RecentNotes />
            </View>
            <View style={{ paddingHorizontal: 24 }}>
              <BoxLink
                navigate={() => navigate("OwnNotes", initialFilter)}
                title="Moje notatki"
                count={24}
                icon={<NotesIcon width={42} stroke={font} strokeWidth={1.6} />}
              />
            </View>
          </View>
        }
      />
    </Layout>
  ) : (
    <Loader />
  );
};

const { height } = Dimensions.get("screen");

export default NoteList;
