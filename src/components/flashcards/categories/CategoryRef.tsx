import { useNavigation } from "@react-navigation/native";
import { Category } from "../../../types/general";
import { CategoryNavigationProps } from "../../../types/navigation";
import { useTailwind } from "tailwind-rn/dist";
import { Image, Text, TouchableOpacity } from "react-native";

const CategoryRef = (props: Category) => {
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

export default CategoryRef;
