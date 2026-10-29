import { Dino } from "@/assets/types/dinodata";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import emptyheart from '../../assets/images/heart-empty.png';
import heart from '../../assets/images/heart.png';

type DinoCardProps = {
    dino: Dino
}

export default function DinoCard({ dino }: DinoCardProps) {
    const [favourite, setFavourite] = useState(true);

    return (
        <View className="w-1/2 p-2" style={{ position: "relative" }}>
            <View className="flex-1">
                <View className="rounded-xl bg-orange-100 p-4 items-center aspect-square">
                    <Text
                        className={`pb-3 font-bold text-center ${dino.name.length > 12 ? 'text-xl' : 'text-2xl'
                            }`}
                    >
                        {dino.name}
                    </Text>
                    <Image
                        source={dino.imgsrc}
                        className="flex-1"
                        resizeMode="contain"
                    />
                    <Pressable
                        onPress={() => setFavourite(prev => !prev)}
                        style={{
                            position: "absolute",
                            bottom: 4,
                            right: 4,
                            zIndex: 100,
                            elevation: 10,
                        }}
                        hitSlop={10}
                    >
                        <Image
                            source={favourite ? emptyheart : heart}
                            style={{ width: 40, height: 40 }}
                            resizeMode="contain"
                        />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
