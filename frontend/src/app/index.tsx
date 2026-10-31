import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Alert, Image, Pressable, Text, View } from "react-native";
import fossil from '../../assets/images/fossil.png';
import stegosaurus from '../../assets/images/stegosaurus.png';
import Footer from "../components/footer";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { API_URL } from '../config/api';

export default function Index() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("Authprovider is missing.");
  }

  const [jwtToken, setJwtToken] = auth;
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    async function getUsername() {
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
          setUsername(data.username)
        }
        else {
          const error = await response.text();
          Alert.alert("Ett fel uppstod:", error)
        }
      }
      else {
        setUsername(null)
      }
    }
    getUsername()
  }, [jwtToken])


  function handleSignOut() {
    Alert.alert("Du är nu utloggad!")
    setJwtToken("")
    setUsername(null);
  }


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
          {!jwtToken ? (
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
          ) : (
            <View className='items-center'>
              <View className='flex-row'>
                <Text className='text-2xl'>
                  Välkommen tillbaka,&nbsp;
                </Text>
                <Text className='font-bold text-2xl'>
                  {username}
                </Text>
              </View>
              <View className='flex-row items-center'>
                <Image
                  source={stegosaurus}
                  className='w-[120px] h-[120px] bottom-0 left-0'
                />
                <Pressable
                  className="p-3 ml-4 border-2 rounded-xl border-black bg-orange-100"
                  onPress={() => handleSignOut()}
                >
                  <Text className="text-xl font-bold">
                    Logga ut
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
        <Footer />
      </LinearGradient>
    </View>
  );
}