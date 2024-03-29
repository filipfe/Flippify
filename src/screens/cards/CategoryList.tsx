import { useCallback, useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Category } from "../../types/general";
import CategoryRef from "../../components/flashcards/categories/CategoryRef";
import { DEFAULT_STYLES } from "../../const/styles";
import Loader from "../../components/ui/Loader";
import { ThemeContext } from "../../context/ThemeContext";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { supabase } from "../../hooks/useAuth";
import ListTitle from "../../components/flashcards/categories/ListTitle";
import RecentCategoryRef from "../../components/flashcards/categories/RecentCategoryRef";
import { useFocusEffect } from "@react-navigation/native";

async function fetchCategories() {
  const { data } = await supabase
    .from("categories")
    .select("id, name")
    .order("name");
  return data as Category[];
}

export default function CategoryList() {
  const { background } = useContext(ThemeContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const recent = categories.filter(
    (item) => item.id && [1, 2, 3].includes(item.id)
  );

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchCategories();
    setIsRefreshing(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      setIsLoading(true);
      async function fetchInitial() {
        const categories = await fetchCategories();
        isActive && setCategories(categories);
        setIsLoading(false);
      }
      fetchInitial();
      return () => {
        isActive = false;
      };
    }, [])
  );

  return isLoading ? (
    <Loader />
  ) : (
    <View style={{ ...styles.wrapper, backgroundColor: background }}>
      {categories.length > 0 ? (
        <FlatList
          contentContainerStyle={{ paddingBottom: 24, paddingTop: 12 }}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={categories}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          ListHeaderComponent={
            <>
              <FlatList
                contentContainerStyle={{
                  paddingBottom: 36,
                  paddingHorizontal: 24,
                }}
                showsVerticalScrollIndicator={false}
                data={recent}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                ListHeaderComponent={<ListTitle>Ostatnie</ListTitle>}
                renderItem={({ item }) => <RecentCategoryRef {...item} />}
                keyExtractor={(category) => "recent:" + category.name}
              />
              <View style={{ paddingHorizontal: 24 }}>
                <ListTitle>Kategorie</ListTitle>
              </View>
            </>
          }
          renderItem={({ item, index }) => (
            <View
              style={{
                flex: 1,
                paddingLeft: index % 2 === 0 ? 24 : 8,
                paddingRight: index % 2 === 0 ? 8 : 24,
              }}
            >
              <CategoryRef {...item} />
            </View>
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
  wrapper: {
    flex: 1,
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
});
