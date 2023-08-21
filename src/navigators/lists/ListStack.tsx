import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../../components/header/Header";
import HeaderMenu from "../../components/header/HeaderMenu";
import { ListStackParams } from "../../types/navigation";
import ListScreen from "../../screens/lists/ListScreen";

const ListStackNav = createNativeStackNavigator<ListStackParams>();

export default function ListStack() {
  return (
    <ListStackNav.Navigator
      initialRouteName="ListScreen"
      screenOptions={{
        headerShadowVisible: false,
        header: (props) => <Header {...props} />,
        headerRight: (_) => <HeaderMenu route="ListScreen" />,
      }}
    >
      <ListStackNav.Screen
        name="ListScreen"
        component={ListScreen}
        options={{ title: "Fiszkolisty" }}
      />
    </ListStackNav.Navigator>
  );
}
