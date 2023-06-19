import { useContext, useEffect, useState } from "react";
import { Text, ScrollView, View, StyleSheet } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { API_URL } from "@env";
import { Category } from "../../../types/general";
import CategoryRef from "./CategoryRef";
import { DEFAULT_STYLES } from "../../../const/styles";
import Loader from "../../Loader";
import { ThemeContext } from "../../../context/ThemeContext";
import { FlatList } from "react-native-gesture-handler";

export default function CategoryList() {
  const route = useRoute();
  const { background } = useContext(ThemeContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/api/categories`)
      .then((res) => res.data)
      .then((data) => setCategories(data))
      .catch((err) => console.log(err.response))
      .finally(() => setIsLoading(false));
  }, [route]);

  return isLoading ? (
    <Loader />
  ) : (
    <View style={{ ...styles.wrapper, backgroundColor: background }}>
      {categories.length > 0 ? (
        <FlatList
          contentContainerStyle={{ overflow: "visible", paddingVertical: 24 }}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          data={categories}
          ItemSeparatorComponent={() => <View style={{ height: 24 }}></View>}
          renderItem={({ item, index }) => (
            <CategoryRef {...item} index={index} key={item.id} />
          )}
          keyExtractor={(category) => category.name}
        />
      ) : (
        <Text style={DEFAULT_STYLES.error}>
          Wystąpił błąd, spróbuj ponownie później!
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  addFlashList: {
    fontFamily: "Medium",
    marginBottom: 16,
    fontSize: 16,
    color: "#0000FF",
  },
  loaderWrapper: {
    width: "100%",
    marginBottom: 32,
  },
});
