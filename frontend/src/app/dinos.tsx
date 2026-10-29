import { dinoList } from '@/assets/types/dinodata';
import BackButton from '@/src/components/backButton';
import DinoCard from '@/src/components/dinoCard';
import Footer from '@/src/components/footer';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from "react-native";

export default function Dinos() {
  const router = useRouter();
  return (
    <View className="flex-1">
      <LinearGradient
        colors={['#16a34a', '#fef3c7']}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 180,
          }}>
          <View className='flex-1 items-center p-4'>
            <BackButton />
            <Text className='font-kablammo text-6xl pt-20 pb-5'>
              Dinos
            </Text>
            <View className="flex-row flex-wrap">
              {dinoList.map((dino) => (
                <DinoCard key={dino.name} dino={dino} />
              ))}
            </View>
              <Pressable className="m-2 self-end p-4 rounded-xl bg-orange-100">
                <Text className="text-xl font-bold">
                  Spara favoriter
                </Text>
              </Pressable>
          </View>
        </ScrollView>
      </LinearGradient>
      <Footer />
    </View>
  );
}
Pressable