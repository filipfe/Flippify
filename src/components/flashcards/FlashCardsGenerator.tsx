import { useRoute } from "@react-navigation/native";
import FlashCardRef from "./FlashCardRef";
import Loader from "../Loader";
import { GeneratorRouteProps } from "../../types/navigation";
import { View, StyleSheet } from "react-native";
import UserCredentials from "../UserCredentials";
import { initialUserState } from "../../const/auth";
import useFlashCard from "../../hooks/useFlashCard";
import { FlashCardContext } from "../../context/FlashCardContext";
import NotFound from "../NotFound";

export default function FlashCardsGenerator() {
  const { params } = useRoute<GeneratorRouteProps>();
  const flashCard = useFlashCard(params);
  const { isLoading, activeCard } = flashCard;

  if (!isLoading) return <Loader />;
  if (!flashCard.activeCard) return <NotFound />;
  return (
    <FlashCardContext.Provider value={flashCard}>
      <View style={styles.wrapper}>
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
    backgroundColor: "#FFF",
  },
});
