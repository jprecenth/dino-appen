import type { Dino } from '@/assets/types/dinodata';
import { dinoList } from '@/assets/types/dinodata';
import BackButton from '@/src/components/backButton';
import DinoCard from '@/src/components/dinoCard';
import Footer from '@/src/components/footer';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, ScrollView, Text, View } from "react-native";
import { AuthContext } from '../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { API_URL } from '../config/api';

export default function Dinos() {
  const [favourites, setFavourites] = useState<string[]>([]);

  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("Authprovider is missing.");
  }
  const [jwtToken] = auth;

  useEffect(() => {
    async function getFavourites() {
      if (jwtToken) {
        const response = await fetch(`${API_URL}/favourites`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${jwtToken}`
          }
        })
        if (response.ok) {
          const data = await response.json();
          setFavourites(data.favourites.map((fav: { dinoID: string }) => fav.dinoID))
        }
        else {
          const error = await response.text();
          Alert.alert("Ett fel uppstod:", error)
        }
      }
    }
    getFavourites()
  }, [jwtToken])

  async function favouriteToggle(dino: Dino) {
    if (favourites.includes(dino.dinoID)) {
      const updatedFavourites = favourites.filter((id) => id !== dino.dinoID);
      const response = await fetch(`${API_URL}/favourites/${dino.dinoID}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${jwtToken}`
        }
      },)
      if (response.ok) {
        setFavourites(updatedFavourites);
      }
      else {
        const error = await response.text();
        Alert.alert("Ett fel uppstod:", error)
      }
    }

    else {
      const response = await fetch(`${API_URL}/favourites/${dino.dinoID}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${jwtToken}`
        }
      },)
      if (response.ok) {
        setFavourites([...favourites, dino.dinoID])
      }
      else {
        const error = await response.text();
        Alert.alert("Ett fel uppstod:", error)
      }

    }
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
          }}>
          <View className='flex-1 items-center pb-[45px] p-4'>
            <BackButton />
            <Text className='font-kablammo text-6xl pt-20 pb-5'>
              Dinos
            </Text>
            <View className="flex-row flex-wrap">
              {dinoList.map((dino) => (
                <DinoCard
                  key={dino.name}
                  dino={dino}
                  isFavourite={favourites.includes(dino.dinoID)}
                  favouriteToggle={favouriteToggle}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
      <Footer />
    </View>
  );
}
