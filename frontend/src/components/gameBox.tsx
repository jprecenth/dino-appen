import { dinoList } from "@/assets/types/dinodata";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";
import asteroids from '../../assets/images/asteroids.png';
import { AuthContext } from "../context/AuthContext";
import { API_URL } from "../config/api";


export default function GameBox() {
    const [gameStart, setGameStart] = useState(true)
    const [guess, setGuess] = useState("");
    const [dinos, setDinos] = useState(dinoList)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [points, setPoints] = useState(0)
    const [skips, setSkips] = useState(3)
    const [disabledGuess, setDisabledGuess] = useState(false)
    const [correctGuess, setCorrectGuess] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const router = useRouter();

    const auth = useContext(AuthContext);
    if (!auth) {
        throw new Error("Authprovider is missing.");
    }
    const [jwtToken] = auth;

    async function handleGameResult(finalPoints: number) {
        const data = { points: finalPoints };
        const response = await fetch(`${API_URL}/results`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const error = await response.text();
            Alert.alert("Ett fel uppstod:", error)
        }
    }


    const handleGuess = () => {
        if (guess.trim() === "") {
            alert("Du måste skriva något för att gissa");
            return
        }
        const isCorrect = guess.trim().toLocaleLowerCase() === dinos[currentIndex].name.toLocaleLowerCase();

        setCorrectGuess(isCorrect)
        setShowResult(true)

        if (isCorrect) {
            setPoints(prev => prev + 1)
        }

        setTimeout(() => {
            setShowResult(false)
        }, 500);

        if (currentIndex < dinos.length - 1) {
            setCurrentIndex(prev => prev + 1)
        }

        if (currentIndex === dinos.length - 1) {
            setGameOver(true)
            if (jwtToken) {
                handleGameResult(isCorrect ? points + 1 : points)
            }
        }

        setGuess("")
    }

    const handleSkip = () => {
        if (skips === 1) {
            setDisabledGuess(true)
        }
        setSkips(prev => prev - 1)
        if (currentIndex === dinos.length - 1) {
            setGameOver(true)
            if (jwtToken) {
                handleGameResult(points)
            }
        }
        else {
            setCurrentIndex(prev => prev + 1)
        }
        setGuess("");
    }

    const restartGame = () => {
        const shuffledDinoList = [...dinoList].sort(() => Math.random() - 0.5);

        setDinos(shuffledDinoList);
        setCurrentIndex(0);
        setPoints(0);
        setSkips(3);
        setGuess("");
        setDisabledGuess(false);
        setShowResult(false);
        setGameOver(false);
        setGameStart(false)

    }

    return (
        <>
            {gameStart ? (

                <View className='w-full mt-20 items-center'>
                    <View className="w-3/4 justify-evenly rounded-xl aspect-square items-center bg-orange-200 p-6">
                        <Text className='text-2xl text-center'>
                            Gissa vilken dino som visas på bilden, och försök få alla rätt!
                        </Text>
                        <Text className='text-3xl mt-6 font-bold'>
                            Starta spelet?
                        </Text>
                        <View className="flex-row w-3/4 justify-between">
                            <Pressable
                                className="p-4 rounded-xl mr-5 bg-orange-100 flex-grow items-center"
                                onPress={() => {
                                    const shuffledDinoList = [...dinoList].sort(() => Math.random() - 0.5);
                                    setDinos(shuffledDinoList);
                                    setCurrentIndex(0)
                                    setGameStart(false)
                                }
                                }
                            >
                                <Text className="text-2xl font-bold">
                                    Vi kör!
                                </Text>
                            </Pressable>
                            <Pressable
                                className="p-4 rounded-xl  bg-orange-100"
                                onPress={() => router.replace('/')}
                            >
                                <Text className="text-xl">
                                    Avbryt
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            )
                : gameOver ? (
                    <View className="w-5/6 items-center justify-between mt-20 rounded-xl aspect-square p-6 bg-orange-200">
                        <Text className="text-5xl font-kablammo">
                            Resultat
                        </Text>
                        <Image
                            source={asteroids}
                            className="h-[100px] w-[100px]"
                        />
                        <Text className="text-2xl">
                            Du fick {points} poäng!
                        </Text>
                        {jwtToken
                            ? <></>
                            : <Text className="text-xl text-center mt-2 mb-2">
                                Logga in eller skapa ett konto för att spara dina spelresultat!
                            </Text>
                        }
                        <View className="flex-row">
                            <Pressable
                                className="p-4 rounded-xl mr-5 bg-orange-100 flex-grow items-center"
                                onPress={() => restartGame()}
                            >
                                <Text className="text-2xl font-bold">
                                    Spela igen?
                                </Text>
                            </Pressable>
                            <Pressable
                                className="p-4 rounded-xl  bg-orange-100"
                                onPress={() => router.replace('/')}
                            >
                                <Text className="text-xl">
                                    Avbryt
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                )
                    : (
                        <View className='w-full mt-10 items-center'>
                            <View className="flex-row w-3/4 justify-evenly items-center mb-5">
                                <Text className='text-3xl'>
                                    Vem där?
                                </Text>
                                <View className="bg-orange-200 p-3 flex-row rounded-xl items-center">
                                    <Text className="text-xl">
                                        {currentIndex + 1}/{dinoList.length}
                                    </Text>
                                </View>
                                <View className="bg-orange-200 p-3 flex-row rounded-xl items-center">
                                    <Text className="font-bold text-xl">
                                        Poäng:&nbsp;
                                    </Text>
                                    <Text className="text-xl">
                                        {points}
                                    </Text>
                                </View>
                            </View>
                            <View className="bg-orange-200 w-3/4 aspect-square items-center justify-center rounded-xl p-8">
                                <Image
                                    source={dinos[currentIndex].imgsrc}
                                    className="flex-1 w-full"
                                    resizeMode="contain"
                                />
                                {showResult && (

                                    <Text className={`font-bold text-5xl p-2 rounded-xl top-6 left-6 absolute bg-black ${correctGuess
                                        ? `text-green-400`
                                        : `text-red-400`
                                        }`}
                                    >
                                        {correctGuess ? "RÄTT!" : "FEL!"}
                                    </Text>
                                )}
                            </View>
                            <TextInput
                                className='bg-orange-100 rounded-xl w-3/4 text-center h-20 mt-5 text-xl'
                                placeholder='Skriv här...'
                                onChangeText={setGuess}
                                value={guess}
                            />
                            <View className="flex-row mt-5 w-3/4 justify-between">
                                <Pressable
                                    className="p-4 rounded-xl mr-5 bg-orange-100 flex-grow items-center"
                                    onPress={handleGuess}
                                >
                                    <Text className="text-2xl">
                                        Gissa
                                    </Text>
                                </Pressable>
                                <Pressable
                                    className={`p-4 rounded-xl ${skips === 0 ? `bg-gray-400` : `bg-orange-100`}`}
                                    onPress={handleSkip}
                                    disabled={disabledGuess}
                                >
                                    <Text className="text-xl">
                                        Hoppa över ({skips})
                                    </Text>
                                </Pressable>
                            </View>

                        </View>
                    )
            }
        </>
    )
}