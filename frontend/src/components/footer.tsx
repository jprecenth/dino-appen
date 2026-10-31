import { Link, usePathname } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import book from '../../assets/images/book.png';
import logo from '../../assets/images/logo-dinosaur.png';
import star from '../../assets/images/star.png';
export default function Footer() {

    const pathName = usePathname();

    return (
        <View>
            {pathName === '/game'
                ?
                <View className="flex-row bottom-0 absolute w-full bg-orange-200 justify-between pb-[45px]">
                    <Link href={'/dinos'} asChild>
                        <Pressable
                            className='m-6 p-4 ml-6 rounded-xl items-center bg-orange-100'>
                            <Image
                                source={book}
                                className="h-[60px] w-[60px]"
                            />
                        </Pressable>
                    </Link>
                    <Link href={'/game'} asChild>
                        <Pressable
                            className='m-6 p-4 ml-6 rounded-xl items-center bg-green-400'>
                            <Image
                                source={star}
                                className="h-[60px] w-[60px]"
                            />

                        </Pressable>
                    </Link>
                    <Link href={'/account'} asChild>
                        <Pressable
                            className='m-6 p-4 ml-6 rounded-xl items-center bg-orange-100'>
                            <Image
                                source={logo}
                                className="h-[60px] w-[60px]"
                            />
                        </Pressable>
                    </Link>
                </View>
                :
                <View className="flex-row bottom-0 absolute w-full bg-orange-200 justify-between pb-[45px]">
                    <Link href={'/dinos'} asChild>
                        <Pressable
                            className={`m-6 p-4 ml-6 rounded-xl items-center ${pathName === '/dinos'
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
                            className={`m-6 p-4 ml-6 rounded-xl items-center ${pathName === '/game'
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
                            className={`m-6 p-4 ml-6 rounded-xl items-center ${pathName === '/account'
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