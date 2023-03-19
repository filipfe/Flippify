import { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Text,
  Image,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import axios from "axios";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { BASE_URL } from "../../constants/baseUrl";
import { CategoryStackParams } from "../../screens/FlashCardsScreen";

type CategoryNavigationProps = NavigationProp<
  CategoryStackParams,
  "CategoryList"
>;

export interface CategoryProps {
  id: number;
  name: string;
  image: string;
}

const CategoryLoader = () => {
  const tw = useTailwind();
  return (
    <View style={tw("flex-col w-full mb-8")}>
      <View style={tw("mb-4 w-full rounded-xl bg-stroke h-24")} />
      <View style={tw("w-[60%] rounded-xl bg-stroke h-8")} />
    </View>
  );
};

export default function CategoryList({
  navigation,
}: {
  navigation: CategoryNavigationProps;
}) {
  const tw = useTailwind();
  const route = useRoute();
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/api/flashcards/categories`)
      .then((res) => res.data)
      .then((data) => setCategories(data))
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  }, [route]);

  return (
    <ScrollView style={tw("p-6 bg-white")}>
      <Pressable onPress={() => navigation.navigate("AddCard")}>
        <Text style={tw("text-blue-400 font-medium mb-4 text-[1rem]")}>
          Dodaj fiszkę
        </Text>
      </Pressable>
      {loading ? (
        categories.length > 0 ? (
          categories.map((category) => (
            <Category {...category} key={category.name} />
          ))
        ) : (
          <Text style={tw("text-red-400")}>
            Wystąpił błąd, spróbuj ponownie później!
          </Text>
        )
      ) : (
        <>
          <CategoryLoader />
          <CategoryLoader />
          <CategoryLoader />
          <CategoryLoader />
        </>
      )}
    </ScrollView>
  );
}

const Category = (props: CategoryProps) => {
  const navigation = useNavigation<CategoryNavigationProps>();
  const tw = useTailwind();
  return (
    <TouchableOpacity
      style={tw(
        "bg-white mb-8 border-stroke border-[2px] rounded-xl overflow-hidden"
      )}
      onPress={() => navigation.navigate("TopicList", { category: props })}
    >
      <Image
        style={tw("h-24")}
        source={{
          uri: props.image,
        }}
      />
      <Text style={{ fontFamily: "SemiBold", ...tw("my-2 ml-4 text-xl") }}>
        {props.name}
      </Text>
    </TouchableOpacity>
  );
};
