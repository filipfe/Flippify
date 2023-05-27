import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Loader from "../Loader";
import { API_URL } from "@env";
import { Category } from "../../types/general";
import { Filter } from "../../types/notes";
import { THEME } from "../../const/theme";

const NoteFilter = ({
  filter,
  setFilter,
}: {
  filter: Filter;
  setFilter: any;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/categories`)
      .then((res) => res.data)
      .then((data) => setCategories(data));
  }, []);

  if (categories.length === 0) return <Loader />;

  const CategoryButton = ({ category }: { category: Category }) => (
    <Pressable
      style={{
        ...styles.categoryButton,
        ...(category.name === filter.category
          ? { backgroundColor: THEME.primary }
          : { backgroundColor: "white" }),
      }}
      onPress={() =>
        setFilter((prev: Filter) => ({ ...prev, category: category.name }))
      }
    >
      <Text style={styles.categoryButtonText}>{category.name}</Text>
    </Pressable>
  );

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.filterWrapper}
    >
      <Pressable
        style={styles.categoryButton}
        onPress={() =>
          setFilter((prev: Filter) => ({ ...prev, category: "Wszystkie" }))
        }
      >
        <Text
          style={{
            ...styles.categoryButtonText,
            color: filter.category === "Wszystkie" ? THEME.p : "white",
          }}
        >
          Wszystkie
        </Text>
      </Pressable>
      {categories.map((category) => (
        <CategoryButton category={category} key={category.name} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryButton: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 4,
  },
  categoryButtonText: {
    fontFamily: "Bold",
    fontSize: 18,
  },
  filterWrapper: {
    marginBottom: 24,
    flexDirection: "row",
  },
  allButton: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  allButtonText: {
    fontFamily: "Bold",
    fontSize: 18,
  },
});

export default NoteFilter;
