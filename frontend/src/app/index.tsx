import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Image, Pressable, Text, View } from "react-native";
import fossil from '../../assets/images/fossil.png';
import Footer from "../components/footer";

export default function Index() {
  return (
    <View className='flex-1'>
      <LinearGradient
        colors={['#16a34a', '#fef3c7']}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={{ flex: 1 }}
      >
        <View className='flex-1 justify-center items-center'>
          <View className='flex-row justify-center mb-14'>
            <View className="justify-center items-center">
              <Text className="font-kablammo text-8xl">Dino-</Text>
              <Text className="font-kablammo text-7xl">appen</Text>
            </View>
            <Image
              source={fossil}
              className="h-40 w-40 ml-4"
            />
          </View>
          <View className='flex-row mb-20'>
            <Link href={"/login"} asChild>
              <Pressable className="p-4 border-2 rounded-xl border-black bg-orange-100">
                <Text className="text-2xl font-bold">
                  Logga in
                </Text>
              </Pressable>
            </Link>
            <Link href={"/register"} asChild>
              <Pressable className="p-4 ml-4 border-2 rounded-xl border-black bg-orange-100">
                <Text className="text-2xl font-bold">
                  Skapa konto
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
        <Footer />
      </LinearGradient>
    </View>
  );
}