import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import Loader from "../Loader";
import { API_URL } from "@env";
import { Category } from "../../types/general";
import { Filter } from "../../types/notes";

const NoteFilter = ({
  filter,
  setFilter,
}: {
  filter: Filter;
  setFilter: any;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const tw = useTailwind();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/categories`)
      .then((res) => res.data)
      .then((data) => setCategories(data));
  }, []);

  if (categories.length === 0) return <Loader />;

  const CategoryButton = ({ category }: { category: Category }) => (
    <Pressable
      style={tw(
        `py-1 px-4 rounded-xl mr-1 ${
          category.name === filter.category ? "bg-primary" : "bg-white"
        }`
      )}
      onPress={() =>
        setFilter((prev: Filter) => ({ ...prev, category: category.name }))
      }
    >
      <Text
        style={{
          fontFamily: "Bold",
          ...tw(
            `text-lg ${
              category.name === filter.category ? "text-white" : "text-p"
            }`
          ),
        }}
      >
        {category.name}
      </Text>
    </Pressable>
  );

  return (
    <View style={tw("mb-6")}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={tw("flex-row")}
      >
        <Pressable
          style={tw(
            `py-1 px-4 rounded-xl ${
              filter.category === "Wszystkie" ? "bg-primary" : "bg-white"
            }`
          )}
          onPress={() =>
            setFilter((prev: Filter) => ({ ...prev, category: "Wszystkie" }))
          }
        >
          <Text
            style={{
              fontFamily: "Bold",
              ...tw(
                `text-lg ${
                  filter.category === "Wszystkie" ? "text-white" : "text-p"
                }`
              ),
            }}
          >
            Wszystkie
          </Text>
        </Pressable>
        {categories.map((category) => (
          <CategoryButton category={category} key={category.name} />
        ))}
      </ScrollView>
    </View>
  );
};

export default NoteFilter;
