import { View, Text } from "react-native";
import { globalStyles } from "../../../../styles/general";
import Switch from "../../../Switch";
import { NewNoteContext } from "../../../../context/OpusContext";
import { useContext } from "react";
import { THEME } from "../../../../const/theme";

export default function PrivacySwitch() {
  const { item, setItem } = useContext(NewNoteContext);

  const changePrivacy = (value: string) => {
    const privacyValue = value as "public" | "private";
    setItem((prev) => ({ ...prev, privacy: privacyValue }));
  };

  return (
    <View style={{ marginTop: 32 }}>
      <Text style={{ ...globalStyles.paramText, marginBottom: 16 }}>
        Typ notatki
      </Text>
      <Switch
        activeValue={item.privacy}
        onChange={changePrivacy}
        options={[
          { label: "Publiczna", value: "public" },
          { label: "Prywatna", value: "private" },
        ]}
      />
      <Text
        style={{
          fontFamily: "Medium",
          fontSize: 12,
          color: THEME.secondary,
          marginTop: 16,
          lineHeight: 20,
        }}
      >
        {item.privacy === "public"
          ? "Notatka publiczna możliwa będzie do zobaczenia przez każdego użytkownika aplikacji, będziesz mógł zbierać za nią polubienia."
          : "Notatka prywatna zapisana zostanie do wglądu tylko dla Ciebie, inni użytkownicy aplikacji nie będą mogli jej zobaczyć ani ocenić."}
      </Text>
    </View>
  );
}
