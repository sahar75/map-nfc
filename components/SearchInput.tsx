import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { twMerge } from "tailwind-merge";

interface ISearchInputProps {
  placeholder?: string;
  initialQuery?: string;
  containerStyles?: string;
  onSubmit: (query: string) => void;
}

const SearchInput: React.FC<ISearchInputProps> = ({
  initialQuery,
  placeholder,
  containerStyles,
  onSubmit,
}) => {
  const [query, setQuery] = useState(initialQuery ?? "");

  return (
    <View
      className={twMerge(
        "w-full h-16 px-4 border-2 border-[#ECEEF6] bg-black-100 rounded-xl focus:border-violet-800 items-center flex-row space-x-4",
        containerStyles
      )}
    >
      <TouchableOpacity
        onPress={() => {
          onSubmit(query);
        }}
      >
        <FontAwesome size={28} color="#C4C4C4" name="search" />
      </TouchableOpacity>
      <TextInput
        className="text-base mt-0.5 flex-1"
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#cdcde0"
        onChangeText={(e) => setQuery(e)}
      />
    </View>
  );
};

export default SearchInput;
