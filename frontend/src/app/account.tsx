import { dinoList } from '@/assets/types/dinodata';
import BackButton from '@/src/components/backButton';
import Footer from '@/src/components/footer';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import emptyheart from '../../assets/images/heart-empty.png';

export default function Account() {
  const router = useRouter();
  const gameresults = false;

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
          <View className='flex-1 justify-center items-center p-4'>
            <BackButton />
            <Text className='font-kablammo text-6xl pt-20'>
              Hej
            </Text>
            <Text className='font-kablammo mb-5 text-5xl'>
              Användarnamn!
            </Text>
            <View className='p-2 w-full'>
              <View className='bg-orange-200 p-4 m-2 rounded-xl'>
                <Text className='font-bold text-3xl mb-4'>
                  Kontoinformation
                </Text>
                <View className='pl-4'>
                  <View className='flex-row mb-2'>
                    <Text className='font-bold text-xl'>
                      Användarnamn:&nbsp;
                    </Text>
                    <Text className='text-xl'>
                      TestUser
                    </Text>
                  </View>
                  <View className='flex-row'>
                    <Text className='font-bold text-xl'>
                      Konto skapades:&nbsp;
                    </Text>
                    <Text className='text-xl'>
                      10-10-2026
                    </Text>
                  </View>
                  <Pressable className="self-end p-3 mt-4 border-2 rounded-xl border-black bg-orange-100">
                    <Text className="text-xl font-bold">
                      Logga ut
                    </Text>
                  </Pressable>
                </View>
              </View>
              <View className='bg-orange-200 p-4 m-2 rounded-xl'>
                <Text className='font-bold text-3xl mb-2'>
                  Favorit-dinos
                </Text>
                {dinoList.length === 0
                  ?
                  <View className="flex-row flex-wrap">
                    {dinoList.map((dino) => (
                      <View className="w-1/3 p-2" style={{ position: "relative" }}>
                        <View className="flex-1">
                          <View className="rounded-xl bg-orange-100 p-4 items-center aspect-square">
                            <Image
                              source={dino.imgsrc}
                              className="flex-1"
                              resizeMode="contain"
                            />
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                  :
                  <View className="items-center">
                    <Image
                      source={emptyheart}
                      style={{ width: 40, height: 40 }}
                    />
                    <Text className='text-2xl font-bold'>
                      Inga favorit-dinos!
                    </Text>
                    <View className='flex-row items-center'>
                      <Text className='text-xl'>
                        Lägg till en favorit-dino på&nbsp;
                      </Text>
                      <Link
                        href={"/dinos"}
                      >
                        <Text className='text-xl font-bold underline'>
                          Dinos-sidan
                        </Text>
                      </Link>
                    </View>
                  </View>
                }
              </View>
              <View className='bg-orange-200 p-4 m-2 rounded-xl'>
                <Text className='font-bold text-3xl mb-2'>
                  Spelstatistik
                </Text>
                {gameresults ?
                  <View className='p-4'>
                    <Text className='text-xl font-bold mb-4'>
                      Bästa resultat:
                    </Text>
                    <View className='flex-row items-center mb-2'>
                      <Text className='text-4xl font-kablammo mr-4 p-2 bg-green-400 rounded-xl'>
                        1.
                      </Text>
                      <Text className='text-xl'>
                        8/8 dinos, 26-10-2026
                      </Text>
                    </View>
                    <View className='flex-row items-center mb-2'>
                      <Text className='text-4xl font-kablammo mr-4 p-2 bg-yellow-400 rounded-xl'>
                        2.
                      </Text>
                      <Text className='text-xl'>
                        2/8 dinos, 26-10-2026
                      </Text>
                    </View>
                    <View className='flex-row items-center'>
                      <Text className='text-4xl font-kablammo mr-4 p-2 bg-red-400 rounded-xl'>
                        3.
                      </Text>
                      <Text className='text-xl'>
                        1/8 dinos, 26-10-2026
                      </Text>
                    </View>
                  </View>
                  :
                  <View className='p-4 items-center'>
                    <Text className='text-2xl font-bold'>
                      Du har inga spelrekord ännu!
                    </Text>
                    <View className='flex-row items-center flex-wrap justify-center'>
                      <Text className='text-xl'>
                        Spela spelet på&nbsp;
                      </Text>
                      <Link
                        href={"/dinos"}
                      >
                        <Text className='text-xl font-bold underline'>
                          Spel-sidan
                        </Text>
                      </Link>
                      <Text className='text-xl'>
                        &nbsp;för att se spelhistoriken.
                      </Text>
                    </View>
                  </View>
                }

              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
      <Footer />
    </View>
  );
}

