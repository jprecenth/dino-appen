import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import logo from '../../assets/images/logo-dinosaur.png';
import stegosaurus from '../../assets/images/stegosaurus.png';

export default function Register() {
    const router = useRouter();
    return (
        <View className="flex-1 bg-orange-200">
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 180,
                }}>
                <View className='flex-1 justify-center items-center p-4'>
                    <Text className='font-kablammo text-6xl pt-20 pb-5'>
                        Skapa konto
                    </Text>
                    <Image
                        source={logo}
                        className="h-40 w-40"
                    />
                    <View className='w-3/4'>
                        <Text className="text-xl mt-4 text-center">
                            Välj ett användarnamn och lösenord för att skapa ett konto.
                        </Text>
                        <TextInput
                            className='bg-orange-100 rounded-xl text-center h-20 mt-5 text-xl'
                            placeholder='Användarnamn'
                        />
                        <TextInput
                            className='bg-orange-100 rounded-xl text-center h-20 mt-3 text-xl'
                            placeholder='Lösenord'
                        />

                    </View>
                    <View className="flex-row mt-5 w-3/4 justify-between">
                        <Pressable
                            className="p-4 rounded-xl mr-5 bg-orange-100 flex-grow items-center"
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
