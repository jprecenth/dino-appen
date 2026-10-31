import { useRouter } from 'expo-router';
import { Alert, Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import fossil from '../../assets/images/fossil.png';
import pterodactyl from '../../assets/images/pterodactyl.png';
import { useContext, useState } from 'react';
import { API_URL } from '../config/api';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const auth = useContext(AuthContext);
    if (!auth) {
        throw new Error("AuthProvider is missing");
    }
    const [jwtToken, setJwtToken] = auth;

    async function handleLogIn() {
        const data = { username, password };
        const response = await fetch(`${API_URL}/sessions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();

        if (response.ok) {
            setJwtToken(result.token)
            setUsername("");
            setPassword("");
            Alert.alert("Du är nu inloggad!")
            router.replace("/")
        }
        else {
            Alert.alert("Ett fel uppstod:", result.error)
        }
    }

    return (
        <View className="flex-1 bg-orange-200">
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 180,
                }}
                keyboardShouldPersistTaps='handled'
                >
                <View className='flex-1 justify-center items-center p-4'>
                    <Text className='font-kablammo text-6xl pt-20 pb-5'>
                        Logga&nbsp;in
                    </Text>
                    <Image
                        source={fossil}
                        className="h-40 w-40"
                    />
                    <View className='w-3/4'>
                        <Text className="text-xl mt-4 text-center">
                            Fyll i ditt användarnamn och lösenord för att logga in.
                        </Text>
                        <TextInput
                            className='bg-orange-100 rounded-xl text-center h-20 mt-5 text-xl'
                            placeholder='Användarnamn'
                            id='username'
                            value={username}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            className='bg-orange-100 rounded-xl text-center h-20 mt-3 text-xl'
                            placeholder='Lösenord'
                            id='password'
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />

                    </View>
                    <View className="flex-row mt-5 w-3/4 justify-between">
                        <Pressable
                            className="p-4 rounded-xl mr-5 bg-orange-100 flex-grow items-center"
                            onPress={handleLogIn}
                        >
                            <Text className="text-2xl font-bold">
                                Logga in!
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => router.back()}
                            className="p-4 rounded-xl bg-orange-100"
                        >
                            <Text className="text-xl">
                                Avbryt
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
            <View className='flex-row'>
                <Image
                    source={pterodactyl}
                    className="h-[100px] w-[100px] bottom-0 left-10"
                />
            </View>
        </View>
    );
}
