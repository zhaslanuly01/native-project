import React from "react";
import { TextInput } from "react-native";
import { styles } from "./NewsSearchInput.styles";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function NewsSearchInput({
  value,
  onChange,
  placeholder = "Поиск...",
}: Props) {
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      style={styles.input}
      placeholderTextColor="#999"
    />
  );
}
