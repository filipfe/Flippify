import { View, Text } from "react-native";
import { globalStyles } from "../../../../styles/general";
import Switch from "../../../Switch";
import { NewNoteContext } from "../../../../context/OpusContext";
import { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";

export default function PrivacySwitch() {
  const { item, setItem } = useContext(NewNoteContext);
  const { secondary } = useContext(ThemeContext);

  const changePrivacy = (value: boolean) => {
    setItem((prev) => ({ ...prev, is_public: value }));
  };

  return (
    <View style={{ marginTop: 32 }}>
      <Text
        style={{
          ...globalStyles.paramText,
          marginBottom: 16,
          color: secondary,
        }}
      >
        Typ notatki
      </Text>
      <Switch<boolean>
        activeValue={item.is_public}
        onChange={changePrivacy}
        options={[
          { label: "Publiczna", value: true },
          { label: "Prywatna", value: false },
        ]}
      />
      <Text
        style={{
          fontFamily: "Medium",
          fontSize: 12,
          color: secondary,
          marginTop: 16,
          lineHeight: 20,
        }}
      >
        {item.is_public
          ? "Notatka publiczna możliwa będzie do zobaczenia przez każdego użytkownika aplikacji, będziesz mógł zbierać za nią polubienia."
          : "Notatka prywatna zapisana zostanie do wglądu tylko dla Ciebie, inni użytkownicy aplikacji nie będą mogli jej zobaczyć ani ocenić."}
      </Text>
    </View>
  );
}
