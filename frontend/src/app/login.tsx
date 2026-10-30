import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import fossil from '../../assets/images/fossil.png';
import pterodactyl from '../../assets/images/pterodactyl.png';

export default function Login() {
    const router = useRouter();
    return (
        <View className="flex-1 bg-orange-200">
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 180,
                }}>
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
                        />
                        <TextInput
                            className='bg-orange-100 rounded-xl text-center h-20 mt-3 text-xl'
                            placeholder='Lösenord'
                            id='password'
                        />

                    </View>
                    <View className="flex-row mt-5 w-3/4 justify-between">
                        <Pressable
                            className="p-4 rounded-xl mr-5 bg-orange-100 flex-grow items-center"
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
