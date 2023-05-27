import { useEffect, useState } from "react";
import { Text, Pressable, ScrollView, View, StyleSheet } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { API_URL } from "@env";
import { Category } from "../../../types/general";
import { CategoryNavigationProps } from "../../../types/navigation";
import CategoryRef from "./CategoryRef";
import { THEME } from "../../../const/theme";
import { DEFAULT_STYLES } from "../../../const/styles";
import Loader from "../../Loader";

export default function CategoryList() {
  const route = useRoute();
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.wrapper}>
        {categories.length > 0 ? (
          categories.map((category) => (
            <CategoryRef {...category} key={category.name} />
          ))
        ) : (
          <Text style={DEFAULT_STYLES.error}>
            Wystąpił błąd, spróbuj ponownie później!
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
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
  loaderBox: {
    marginBottom: 16,
    width: "100%",
    borderRadius: 16,
    backgroundColor: THEME.light,
    height: 96,
  },
  loaderText: {
    width: "60%",
    borderRadius: 16,
    backgroundColor: THEME.light,
    height: 32,
  },
});
