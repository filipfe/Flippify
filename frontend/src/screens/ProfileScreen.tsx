import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { useAppSelector } from "../hooks/useAppSelector";
import AdminPanel from "../components/profile/AdminPanel";
import { logout } from "../../reducers/login";
import { useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationProp } from "@react-navigation/native";
import OwnFlashCards from "../components/profile/OwnFlashCards";
import axios from "axios";
import { BASE_URL } from "../constants/baseUrl";
import FlashLists from "../components/profile/FlashLists";
import { SafeAreaView } from "react-native-safe-area-context";

export type ProfileStackParams = {
    ProfileStack: undefined,
    OwnFlashCards: undefined,
    FlashLists: undefined,
    AdminPanel?: undefined
}

const ProfileStack = createNativeStackNavigator<ProfileStackParams>()

export default function ProfileScreen() {
    const { is_staff } = useAppSelector(state => state.login.user)
    return (
        <ProfileStack.Navigator initialRouteName="ProfileStack" screenOptions={{
            headerTitleStyle: { fontFamily: 'Bold' }
        }}>
            <ProfileStack.Screen name="ProfileStack" component={Profile} options={{
                title: 'Profil',
                headerShown: false
            }} />
            <ProfileStack.Screen name="OwnFlashCards" component={OwnFlashCards} options={{
                title: 'Dodane fiszki'
            }} />
            <ProfileStack.Screen name="FlashLists" component={FlashLists} options={{
                title: 'FiszkoListy'
            }} />
            {is_staff && <ProfileStack.Screen name="AdminPanel" component={AdminPanel} options={{
                title: 'Panel administracyjny'
            }} />}
        </ProfileStack.Navigator>
    )
}

type ProfileNavigation = NavigationProp<ProfileStackParams, 'ProfileStack'>

const Profile = ({ navigation }: { navigation: ProfileNavigation}) => {
    const tw = useTailwind()
    const dispatch = useDispatch()
    const user = useAppSelector(state => state.login)
    const { username, is_staff } = user.user
    const { refresh } = user.tokens

    const handleLogout = async () => {
        const response = await axios.post(`${BASE_URL}/api/logout`, refresh, { headers: { 'Content-Type': 'application/json' }})
        if(response.status === 200) await AsyncStorage.removeItem('user')
        dispatch(logout())
    }

    return (
        <SafeAreaView style={tw('p-4')}>
            <Text style={tw('font-medium mb-4 text-2xl')}>Witaj <Text style={tw('text-primary')}>{username}!</Text></Text>
            {is_staff && <Pressable onPress={() => navigation.navigate('AdminPanel')} style={tw('bg-blue-400 py-3 px-6 my-2')}><Text style={tw('text-white font-medium')}>Admin Panel</Text></Pressable>}
            <Pressable onPress={() => navigation.navigate('OwnFlashCards')} style={tw('bg-blue-400 py-3 px-6 my-2')}><Text style={tw('text-white font-medium')}>Dodane fiszki</Text></Pressable>
            <Pressable onPress={() => navigation.navigate('FlashLists')} style={tw('bg-blue-400 py-3 px-6 my-2')}><Text style={tw('text-white font-medium')}>FiszkoListy</Text></Pressable>
            <Pressable onPress={handleLogout}><Text style={tw('text-red-400 mt-4 font-medium')}>Wyloguj</Text></Pressable>
        </SafeAreaView>
    )
}