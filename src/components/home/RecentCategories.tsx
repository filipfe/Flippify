import { View, Text, StyleSheet } from "react-native";
import { Category } from "../../types/general";
import CategoryRef from "../flashcards/categories/CategoryRef";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

export default function RecentCategories() {
  const { font } = useContext(ThemeContext);
  const categories: Category[] = [
    {
      icon: "https://res.cloudinary.com/dvblmhhhz/image/upload/v1685152322/DivideKnowledge/categories/anatomia_ezpflg.png",
      id: 19,
      name: "Anatomia",
    },
    {
      icon: "https://res.cloudinary.com/dvblmhhhz/image/upload/v1685150890/DivideKnowledge/categories/biologia_cs9q5p.png",
      id: 2,
      name: "Biologia",
    },
    {
      icon: "https://res.cloudinary.com/dvblmhhhz/image/upload/v1685151674/DivideKnowledge/categories/chemia_euaknv.png",
      id: 3,
      name: "Chemia",
    },
  ];
  return (
    <View>
      <Text style={[styles.title, { color: font }]}>Ostatnie kategorie</Text>
      <View style={styles.wrapper}>
        {categories.map((item, index) => (
          <CategoryRef {...item} index={index} key={item.id} />
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 48,
  },
  title: {
    fontFamily: "ExtraBold",
    fontSize: 22,
    lineHeight: 24,
    marginHorizontal: 24,
    marginBottom: 24,
  },
});
