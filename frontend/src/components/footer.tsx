import { Link, usePathname } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import book from '../../assets/images/book.png';
import logo from '../../assets/images/logo-dinosaur.png';
import star from '../../assets/images/star.png';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Footer() {
    const pathName = usePathname();
    const insets = useSafeAreaInsets();

    return (
        <View>
            {pathName === '/game'
                ?
                <View 
                style={{ paddingBottom: insets.bottom }}
                className="flex-row bottom-0 absolute w-full bg-orange-200 justify-evenly">
                    <Link href={'/dinos'} asChild>
                        <Pressable
                            className='m-6 p-4 rounded-xl items-center bg-orange-100'>
                            <Image
                                source={book}
                                className="h-[60px] w-[60px]"
                            />
                        </Pressable>
                    </Link>
                    <Link href={'/game'} asChild>
                        <Pressable
                            className='m-6 p-4 rounded-xl items-center bg-green-400'>
                            <Image
                                source={star}
                                className="h-[60px] w-[60px]"
                            />

                        </Pressable>
                    </Link>
                    <Link href={'/account'} asChild>
                        <Pressable
                            className='m-6 p-4 rounded-xl items-center bg-orange-100'>
                            <Image
                                source={logo}
                                className="h-[60px] w-[60px]"
                            />
                        </Pressable>
                    </Link>
                </View>
                :
                <View 
                style={{ paddingBottom: insets.bottom }}
                className="flex-row bottom-0 absolute w-full bg-orange-200 justify-evenly">
                    <Link href={'/dinos'} asChild>
                        <Pressable
                            className={`m-4 p-4 rounded-xl items-center ${pathName === '/dinos'
                                ? 'bg-green-400'
                                : 'bg-orange-100'
                                }`}>
                            <Image
                                source={book}
                                className="h-20 w-20"
                            />
                            <Text className="text-2xl font-bold">
                                Dinos
                            </Text>
                        </Pressable>
                    </Link>
                    <Link href={'/game'} asChild>
                        <Pressable
                            className={`m-4 p-4 rounded-xl items-center ${pathName === '/game'
                                ? 'bg-green-400'
                                : 'bg-orange-100'
                                }`}>
                            <Image
                                source={star}
                                className="h-20 w-20"
                            />
                            <Text className="text-2xl font-bold">
                                Spela!
                            </Text>
                        </Pressable>
                    </Link>
                    <Link href={'/account'} asChild>
                        <Pressable
                            className={`m-4 p-4 rounded-xl items-center ${pathName === '/account'
                                ? 'bg-green-400'
                                : 'bg-orange-100'
                                }`}>
                            <Image
                                source={logo}
                                className="h-20 w-20"
                            />
                            <Text className="text-2xl font-bold">
                                Konto
                            </Text>
                        </Pressable>
                    </Link>
                </View>
            }
        </View >
    )
}