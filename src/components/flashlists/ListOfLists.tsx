import { useState, useEffect, useContext } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Loader from "../Loader";
import { FlashListStackParams } from "../profile/FlashLists";
import axios from "axios";
import { API_URL } from "@env";
import {
  NavigationProp,
  useNavigation,
  useNavigationState,
} from "@react-navigation/native";
import PrimaryButton from "../PrimaryButton";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../../const/styles";
import RangeSlider from "../RangeSlider";
import { THEME } from "../../const/theme";
import { shadowPrimary } from "../../styles/general";
import GradientText from "../GradientText";
import { FlashList } from "../../types/flashcards";

type ListOfFlashCardListsNavigation = NavigationProp<
  FlashListStackParams,
  "ListOfLists"
>;

export default function ListOfLists({
  navigation,
}: {
  navigation: ListOfFlashCardListsNavigation;
}) {
  const [loading, setLoading] = useState(true);
  const [removed, setRemoved] = useState<number[]>([]);
  const [flashLists, setFlashLists] = useState<FlashList[]>([]);
  const location = useNavigationState((state) => state);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/api/profile`)
      .then((res) => res.data)
      .then((data) => setFlashLists(data.flashlists || []))
      .finally(() => setLoading(false));
  }, [location, removed]);

  if (loading) return <Loader />;

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <View style={{ marginBottom: 8 }}>
          <PrimaryButton text="+ Dodaj nową" />
        </View>
        {flashLists.length > 0 &&
          flashLists.map((list) => (
            <FlashListRef setRemoved={setRemoved} {...list} key={list.name} />
          ))}
      </View>
    </ScrollView>
  );
}

const FlashListRef = (props: FlashList & { setRemoved: any }) => {
  const { navigate } = useNavigation<ListOfFlashCardListsNavigation>();
  const { setRemoved, ...rest } = props;
  const { name, created_at, count } = rest;

  const handleRemove = async () => {
    const resp = await axios.delete(
      `${API_URL}/api/flashlists/delete/${props.id}`
    );
    if (resp.status === 204)
      setRemoved((prev: number[]) => [...prev, props.id]);
  };

  return (
    <View style={styles.refWrapper}>
      <View style={styles.topWrapper}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.points}>{count} fiszki</Text>
      </View>
      <View style={{ ...styles.topWrapper, marginTop: 8 }}>
        <Text style={styles.points}>
          {new Date(created_at).toLocaleDateString("default")}
        </Text>
        <View style={styles.buttonsWrapper}>
          <Pressable
            onPress={() => navigate("FlashList", rest)}
            style={styles.modifyButton}
          >
            <GradientText style={styles.buttonText}>Modyfikuj</GradientText>
          </Pressable>
          <Pressable onPress={() => navigate("FlashList", rest)}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              style={styles.button}
              colors={linearGradient}
            >
              <Text style={styles.buttonText}>Wybierz</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  refWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "#FFF",
    marginTop: 16,
    ...shadowPrimary,
  },
  title: {
    fontFamily: "SemiBold",
    fontSize: 18,
    color: THEME.font,
  },
  topWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  points: {
    color: THEME.secondary,
    fontFamily: "SemiBold",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginLeft: 8,
  },
  buttonText: {
    fontFamily: "ExtraBold",
    color: "#FFFFFF",
    fontSize: 12,
  },
  buttonsWrapper: {
    flexDirection: "row",
  },
  modifyButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 24,
    backgroundColor: THEME.light,
  },
});
