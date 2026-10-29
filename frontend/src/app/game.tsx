import BackButton from '@/src/components/backButton';
import Footer from '@/src/components/footer';
import GameBox from '@/src/components/gameBox';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";

export default function Game() {
  return (
    <View className="flex-1">
      <LinearGradient
        colors={['#16a34a', '#fef3c7']}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={{ flex: 1 }}
      >
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 200,
            flexGrow: 1
          }}
          keyboardShouldPersistTaps='handled'
        >
          <View className=' justify-center items-center p-4'>
            <BackButton />
            <Text className='font-kablammo text-6xl pt-20'>
              Dino-
            </Text>
            <Text className='font-kablammo text-5xl'>
              spelet
            </Text>
            <GameBox />
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
      <Footer />
    </View>
  );
}
