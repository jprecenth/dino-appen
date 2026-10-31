import { dinoList } from '@/assets/types/dinodata';
import BackButton from '@/src/components/backButton';
import Footer from '@/src/components/footer';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { Alert, Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import emptyheart from '../../assets/images/heart-empty.png';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { API_URL } from '../config/api';
import type { AccountData } from '@/assets/types/accountData';

export default function Account() {
  const router = useRouter();
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("Authprovider is missing.");
  }
  const [jwtToken, setJwtToken] = auth;
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [showEditing, setShowEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    async function showAccountDetails() {
      if (jwtToken) {
        const response = await fetch(`${API_URL}/account`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${jwtToken}`
          }
        },
        )
        if (response.ok) {
          const data = await response.json();
          setAccountData(data)
        }
        else {
          const error = await response.text();
          Alert.alert("Ett fel uppstod:", error)
        }
      }
      else {
        setAccountData(null)
      }
    }
    showAccountDetails()
  }, [jwtToken])

  async function updateUsername() {
    const data = { newUserName: newUsername };
    const response = await fetch(`${API_URL}/account/username`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    },)
    if (response.ok) {
      setAccountData((current) =>
        current ? { ...current, username: newUsername.trim() } : current
      );
      setShowEditing(false);
      setNewUsername("");
      Alert.alert(`Ditt användarnamn är nu uppdaterat till ${newUsername.trim()}!`)
    }
    else {
      const error = await response.text();
      Alert.alert("Ett fel uppstod:", error)
    }
  }

  function handleSignOut() {
    setJwtToken("")
    Alert.alert("Du är nu utloggad!")
    setAccountData(null);
    router.replace("/")
  }

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
          }}
          keyboardShouldPersistTaps='handled'
        >
          <View className='flex-1 justify-center items-center p-4 pb-[45px]'>
            <BackButton />

            <Text className='text-3xl font-bold pt-20'>
              Hej
            </Text>
            <Text className='font-kablammo mb-5 text-5xl'>
              {accountData ? `${accountData.username}` : `dinoälskare`}
            </Text>
            <View className='p-2 w-full'>
              {accountData
                ?
                <>
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
                          {accountData.username}
                        </Text>
                      </View>
                      <View className='flex-row'>
                        <Text className='font-bold text-xl'>
                          Konto skapades:&nbsp;
                        </Text>
                        <Text className='text-xl'>
                          {new Date(accountData.accountCreation).toLocaleString("sv-SE")}
                        </Text>
                      </View>
                      <View className='mt-6 self-end flex-row'>
                        <Pressable
                          className={`p-3 border-2 mr-4 rounded-xl border-black ${showEditing ? 'bg-orange-300' : 'bg-orange-100'}`}
                          onPress={() => setShowEditing(!showEditing)}
                        >
                          <Text className="text-xl font-bold">
                            Ändra användarnamn
                          </Text>
                        </Pressable>
                        <Pressable
                          className="p-3 border-2 rounded-xl border-black bg-orange-100"
                          onPress={() => handleSignOut()}
                        >
                          <Text className="text-xl font-bold">
                            Logga ut
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                    {showEditing
                      ? <View className='mt-4 p-4 rounded-xl bg-orange-300 border-2 border-black'>
                        <Text className='font-bold text-xl'>
                          Nytt användarnamn:
                        </Text>
                        <TextInput
                          className='bg-orange-100 rounded-xl text-center h-20 mt-5 text-xl'
                          placeholder='Nytt användarnamn...'
                          id='username'
                          value={newUsername}
                          onChangeText={setNewUsername}
                        />
                        <View className='flex-row self-end mt-4'>
                          <Pressable
                            className="p-3 border-2 rounded-lg mr-2 self-end border-black bg-orange-100"
                            onPress={updateUsername}
                          >
                            <Text className="text-xl font-bold">
                              Spara
                            </Text>
                          </Pressable>
                          <Pressable
                            className="p-3 border-2 rounded-lg self-end border-black bg-orange-100"
                            onPress={() => setShowEditing(!showEditing)}
                          >
                            <Text className="text-xl font-bold">
                              Avbryt
                            </Text>
                          </Pressable>
                        </View>
                      </View>
                      : null
                    }
                  </View>
                  <View className='bg-orange-200 p-4 m-2 rounded-xl'>
                    <Text className='font-bold text-3xl mb-2'>
                      Favorit-dinos
                    </Text>
                    {accountData.favourites.length > 0
                      ?
                      <>
                        <View className="flex-row flex-wrap">
                          {dinoList.filter((dino) => accountData.favourites.includes(dino.dinoID)).map((dino) => (
                            <View
                              className="w-1/3 p-2"
                              style={{ position: "relative" }}
                              key={dino.dinoID}
                            >
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
                        <Link href={"/dinos"} asChild>
                          <Pressable className="self-end p-3 mt-4 border-2 rounded-xl border-black bg-orange-100">
                            <Text className="text-xl font-bold">
                              Redigera
                            </Text>
                          </Pressable>
                        </Link>
                      </>
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
                    {accountData.results.length > 0 ?
                      <View className='p-4'>
                        <Text className='text-xl font-bold mb-4'>
                          Bästa resultat:
                        </Text>
                        {accountData.results.map(result => (
                          <View
                            className='flex-row items-center mb-2'
                            key={result.resultID}
                          >
                            <Text className='font-bold text-xl bg-green-400 mr-4 p-2 rounded-xl'>
                              {result.points}/{dinoList.length}
                            </Text>
                            <Text className='text-xl'>
                              {new Date(result.created_at).toLocaleString("sv-SE")}
                            </Text>
                          </View>
                        ))
                        }
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
                            href={"/game"}
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
                </>
                :
                <>
                  <View
                    className='bg-orange-200 p-4 m-2 rounded-xl'>
                    <Text className='text-center text-xl mb-4'>
                      Du måste vara inloggad för att se din kontoinformation!
                    </Text>
                    <View className='flex-row self-end'>
                      <Link href={"/login"} asChild>
                        <Pressable className="mr-4 p-3 border-2 rounded-xl border-black bg-orange-100">
                          <Text className="text-xl font-bold">
                            Logga in
                          </Text>
                        </Pressable>
                      </Link>
                      <Link href={"/register"} asChild>
                        <Pressable className="p-3 border-2 rounded-xl border-black bg-orange-100">

                          <Text className="text-xl font-bold">
                            Skapa konto
                          </Text>
                        </Pressable>
                      </Link>
                    </View>

                  </View>
                </>
              }
              {/* <View className='bg-orange-100 p-4 m-2 rounded-xl'>
                <Text className='text-xl font-bold text-center mb-2'>
                  Dino-appen
                </Text>
                <View className='mb-4'>
                  <Text className='text-lg'>
                    • Heart icons av Vlad Szirka
                  </Text>
                  <Text className='text-lg'>
                    • Left arrow icons av prinda895
                  </Text>
                  <Text className='text-lg'>
                    • Dinosaur, Fossil, Stone age & Star icons av Magnific
                  </Text>
                </View>
                <Link href={"https://www.flaticon.com/"}>
                  <Text className='text-center font-bold'>
                    https://www.flaticon.com/
                  </Text>
                </Link>
              </View> */}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
      <Footer />
    </View>
  );
}

