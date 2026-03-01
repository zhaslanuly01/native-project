import React from "react";
import { Pressable, ScrollView, Text } from "react-native";
import {
  DATE_FILTERS,
  DATE_FILTER_LABELS,
} from "../../model/news-filters.constants";
import { DateFilter } from "../../model/news-filters.types";
import { styles } from "./FilterChips.styles";

type Props = {
  value: DateFilter;
  onChange: (value: DateFilter) => void;
};

export function DateFilterChips({ value, onChange }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.chipsRow}
    >
      {DATE_FILTERS.map((item) => (
        <Pressable
          key={item}
          style={[styles.chip, value === item && styles.chipActive]}
          onPress={() => onChange(item)}
        >
          <Text
            style={[styles.chipText, value === item && styles.chipTextActive]}
          >
            {DATE_FILTER_LABELS[item]}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
