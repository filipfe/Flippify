import { Text, View } from "react-native";
import { useContext, useState } from "react";
import PrimaryInput from "../PrimaryInput";
import PrimaryButton from "../PrimaryButton";
import axios from "axios";
import { API_URL } from "@env";
import Loader from "../Loader";
import { AuthContext } from "../../context/AuthContext";
import { FlashList } from "../../types/flashcards";
import { initialFlashList } from "../../const/flashcards";

export default function AddFlashList() {
  const { user } = useContext(AuthContext);
  const [status, setStatus] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [newFlashList, setNewFlashList] = useState<FlashList>(initialFlashList);

  const handleAdd = async () => {
    axios
      .post(
        `${API_URL}/api/flashlists/add`,
        JSON.stringify({ user: user.id, name: newFlashList.name }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => setStatus(true))
      .catch(() => setStatus(false))
      .finally(() => setLoading(false));
  };

  if (status !== undefined)
    return (
      <View>
        {status ? (
          <Text>Gratulacje, dodano FiszkoListę!</Text>
        ) : (
          <Text>Wystąpił błąd</Text>
        )}
      </View>
    );

  return (
    <View>
      <PrimaryInput field="name" setState={setNewFlashList} label="Nazwa" />
      {loading && <Loader />}
      <PrimaryButton
        active={newFlashList.name !== ""}
        onPress={handleAdd}
        text="Dodaj FiszkoListę"
      />
    </View>
  );
}
