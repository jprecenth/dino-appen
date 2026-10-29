import { useRouter } from "expo-router";
import { Image, Pressable } from "react-native";
import back from '../../assets/images/left-arrow.png';

export default function BackButton() {
    const router = useRouter();

    return (
        <Pressable
            onPress={() => router.replace('/')}
            className="absolute p-2 mt-5 left-4 z-50 top-20"
        >
            <Image
                className='w-12 h-12'
                source={back}
            />
        </Pressable>
    )

}