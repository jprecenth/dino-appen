import { useRouter } from 'expo-router';
import { Alert, Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import logo from '../../assets/images/logo-dinosaur.png';
import stegosaurus from '../../assets/images/stegosaurus.png';
import { useState } from 'react';
import { API_URL } from '../config/api';

export default function Register() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    async function handleRegistration() {
        const data = { username: username.trim(), password };
        const response = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            setUsername("");
            setPassword("");
            Alert.alert("Konto skapat! Logga in för att utforska Dino-appen!")
            router.replace("/login")
        }
        else {
            const error = await response.text();
            Alert.alert("Ett fel uppstod:", error)
        }
    }

    return (
        <View className="flex-1 bg-orange-200 pb-[45px]">
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 180,
                }}
                keyboardShouldPersistTaps='handled'
            >
                <View className='flex-1 justify-center items-center p-4'>
                    <Text className='font-kablammo text-6xl pt-20 pb-4'>
                        Skapa konto
                    </Text>
                    <View className='flex-row w-3/4'>
                        <Image
                            source={logo}
                            className="h-[100px] w-[100px]"
                        />
                        <Text className="text-lg ml-2 mt-4 text-center flex-1">
                            Välj ett användarnamn och lösenord för att skapa ett konto.
                        </Text>
                    </View>
                    <View className='w-3/4'>
                        <TextInput
                            className='bg-orange-100 rounded-xl text-center h-20 mt-4 text-xl'
                            placeholder='Användarnamn'
                            id='username'
                            value={username}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            className='bg-orange-100 rounded-xl text-center h-20 mt-2 text-xl'
                            placeholder='Lösenord'
                            id='password'
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                    </View>
                    <View className="flex-row mt-4 w-3/4 justify-between">
                        <Pressable
                            className="p-4 rounded-xl mr-2 bg-orange-100 flex-grow items-center"
                            onPress={() => handleRegistration()}
                        >
                            <Text className="text-2xl font-bold">
                                Skapa konto!
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
            <Image
                source={stegosaurus}
                className="h-[100px] w-[100px] bottom-0 left-10"
            />
        </View>
    );
}
