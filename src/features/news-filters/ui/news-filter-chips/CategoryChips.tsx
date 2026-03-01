import React from "react";
import { Pressable, ScrollView, Text } from "react-native";

import {
  ALL_CATEGORIES_LABEL,
  CATEGORY_LABELS,
  NEWS_CATEGORIES,
} from "../../model/news-filters.constants";
import { Category } from "../../model/news-filters.types";
import { styles } from "./FilterChips.styles";

type Props = {
  value: Category | undefined;
  onChange: (value: Category | undefined) => void;
};

export function CategoryChips({ value, onChange }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.chipsRow}
    >
      <Pressable
        style={[styles.chip, !value && styles.chipActive]}
        onPress={() => onChange(undefined)}
      >
        <Text style={[styles.chipText, !value && styles.chipTextActive]}>
          {ALL_CATEGORIES_LABEL}
        </Text>
      </Pressable>

      {NEWS_CATEGORIES.map((item) => (
        <Pressable
          key={item}
          style={[styles.chip, value === item && styles.chipActive]}
          onPress={() => onChange(item)}
        >
          <Text
            style={[styles.chipText, value === item && styles.chipTextActive]}
          >
            {CATEGORY_LABELS[item]}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
