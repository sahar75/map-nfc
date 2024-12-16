import { ErrorBoundaryProps } from "expo-router";
import { Image, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const errorBoundaryImg = require("../assets/images/errorBoundary.png");

export function ErrorBoundary({ error, retry }: Readonly<ErrorBoundaryProps>) {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Image source={errorBoundaryImg} className="h-60 w-60 mb-12" />
      <Text className="text-2xl text-[#344A5F]">Something's wrong here...</Text>
      <Text className="text-red-600 mb-10 mt-4 text-lg w-1/2">
        {error.message}
      </Text>
      <Pressable onPress={retry} className="bg-[#5251FA] py-2 px-4 rounded-lg">
        <Text className="text-white">Try Again?</Text>
      </Pressable>
    </SafeAreaView>
  );
}
