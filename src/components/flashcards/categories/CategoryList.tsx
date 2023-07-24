import { useContext, useEffect, useState } from "react";
import { Text, ScrollView, View, StyleSheet } from "react-native";
import { Category } from "../../../types/general";
import CategoryRef from "./CategoryRef";
import { DEFAULT_STYLES } from "../../../const/styles";
import Loader from "../../Loader";
import { ThemeContext } from "../../../context/ThemeContext";
import { FlatList } from "react-native-gesture-handler";
import { supabase } from "../../../hooks/useAuth";

export default function CategoryList() {
  const { background } = useContext(ThemeContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchCategories = async () => {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      setCategories(data as Category[]);
      setIsLoading(false);
    };
    fetchCategories();
  }, []);

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
