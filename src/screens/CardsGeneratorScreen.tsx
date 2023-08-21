import { useRoute } from "@react-navigation/native";
import FlashCardRef from "../components/flashcards/FlashCardRef";
import Loader from "../components/Loader";
import { GeneratorRouteProps, RootStackParams } from "../types/navigation";
import { View, StyleSheet } from "react-native";
import UserCredentials from "../components/UserCredentials";
import { initialUserState } from "../const/auth";
import useFlashCard from "../hooks/useFlashCard";
import { FlashCardContext } from "../context/FlashCardContext";
import NotFound from "../components/NotFound";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ProgressBar from "../components/ProgressBar";

export default function CardsGeneratorScreen({
  route,
}: NativeStackScreenProps<RootStackParams, "CardsGenerator">) {
  const { background } = useContext(ThemeContext);
  const { params } = useRoute<GeneratorRouteProps>();
  const flashCard = useFlashCard(params, route.params.list?.id);
  const { isLoading, activeCard, completedCount, totalCount } = flashCard;

  if (isLoading.active) return <Loader />;
  if (!flashCard.activeCard) return <NotFound />;
  return (
    <FlashCardContext.Provider value={flashCard}>
      <View style={{ ...styles.wrapper, backgroundColor: background }}>
        {route.params.list?.id && (
          <ProgressBar
            currentValue={completedCount}
            requiredValue={totalCount}
          />
        )}
        <FlashCardRef />
        <View style={{ marginTop: 24 }}>
          <UserCredentials
            user={activeCard.user || initialUserState}
            isLiked={false}
            handleLike={() => {}}
          />
        </View>
      </View>
    </FlashCardContext.Provider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    flex: 1,
  },
});
