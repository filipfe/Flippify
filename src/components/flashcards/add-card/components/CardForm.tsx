import { Pressable, Text, View } from "react-native";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import SelectDropdown from "react-native-select-dropdown";
import { API_URL } from "@env";
import Loader from "../../../Loader";
import PrimaryButton from "../../../PrimaryButton";
import { NewCardContext } from "../../../../providers/NewCardProvider";
import { Category } from "../../../../types/general";
import { AddedFlashCard, Topic } from "../../../../types/flashcards";
import { CardFormNavigationProp } from "../../../../types/navigation";

const CardForm = ({ navigation }: { navigation: CardFormNavigationProp }) => {
  const [status, setStatus] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const { newCard, setNewCard } = useContext(NewCardContext);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/categories`)
      .then((res) => res.data)
      .then((data) => setCategories(data))
      .catch((err) => alert(err));
  }, []);

  useEffect(() => {
    setTopics([]);
    if (newCard.category)
      axios
        .get(`${API_URL}/api/topics/${newCard.category}`)
        .then((res) => res.data)
        .then((data) => setTopics(data))
        .catch(() => setStatus("Error"));
  }, [newCard.category]);

  const handleAdd = () => {
    setStatus("loading");
    axios
      .post(`${API_URL}/api/flashcards/add`, JSON.stringify(newCard))
      .then(() => setStatus("Twoja fiszka została wysłana do weryfikacji!"))
      .catch((err) => setStatus(err));
  };

  if (status === "loading") return <Loader />;
  if (status)
    return (
      <View>
        <Text>{status}</Text>
      </View>
    );

  return (
    <View>
      <SelectDropdown
        data={categories.map((item) => item.name)}
        renderCustomizedButtonChild={(sel) => (
          <View>
            <Text>Kategoria pytania</Text>
            {sel && <Text>{sel}</Text>}
          </View>
        )}
        buttonStyle={{}}
        dropdownStyle={{}}
        onSelect={(item) =>
          setNewCard((prev: AddedFlashCard) => ({
            ...prev,
            category: item,
          }))
        }
        buttonTextAfterSelection={(text) => text}
        rowTextForSelection={(text) => text}
      />
      <SelectDropdown
        data={topics.map((item) => item)}
        renderCustomizedButtonChild={(sel) => (
          <View>
            <Text>Temat pytania</Text>
            {sel && <Text>{sel}</Text>}
          </View>
        )}
        buttonStyle={{}}
        dropdownStyle={{}}
        disabled={!newCard.category}
        onSelect={(item) =>
          setNewCard((prev: AddedFlashCard) => ({ ...prev, topic: item }))
        }
        buttonTextAfterSelection={(text) => text}
        rowTextForSelection={(text) => text}
        search={true}
      />
      <SelectDropdown
        data={["Zamknięte odpowiedzi", "Wprowadzanie odpowiedzi"]}
        renderCustomizedButtonChild={(sel) => (
          <View>
            <Text>Typ pytania</Text>
            {sel && <Text>{sel}</Text>}
          </View>
        )}
        buttonStyle={{}}
        dropdownStyle={{}}
        onSelect={(item) =>
          setNewCard((prev: AddedFlashCard) => ({
            ...prev,
            type: item === "Zamknięte odpowiedzi" ? "radio" : "input",
          }))
        }
        buttonTextAfterSelection={(text) => text}
        rowTextForSelection={(text) => text}
      />
      <Pressable
        onPress={() => newCard.type && navigation.navigate("QuestionsForm")}
      >
        <Text>Konstruuj pytanie</Text>
        {newCard.question && <Text>{newCard.question}</Text>}
      </Pressable>
      <PrimaryButton
        style="mt-auto w-full"
        onPress={handleAdd}
        active={
          Object.values(newCard).every((prop) => prop) &&
          newCard.answers[0].content !== ""
        }
        text="Dodaj fiszkę"
      />
    </View>
  );
};

export default CardForm;
