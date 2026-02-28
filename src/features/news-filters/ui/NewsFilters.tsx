import React from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import {
  ALL_CATEGORIES_LABEL,
  CATEGORY_LABELS,
  DATE_FILTERS,
  DATE_FILTER_LABELS,
  NEWS_CATEGORIES,
} from "../model/news-filters.constants";
import { Category, DateFilter } from "../model/news-filters.types";
import { styles } from "./NewsFilters.styles";

type Props = {
  searchQuery: string;
  onChangeSearchQuery: (value: string) => void;
  category: Category | undefined;
  onChangeCategory: (value: Category | undefined) => void;
  dateFilter: DateFilter;
  onChangeDateFilter: (value: DateFilter) => void;
};

export function NewsFilters({
  searchQuery,
  onChangeSearchQuery,
  category,
  onChangeCategory,
  dateFilter,
  onChangeDateFilter,
}: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        value={searchQuery}
        onChangeText={onChangeSearchQuery}
        placeholder="Поиск..."
        style={styles.searchInput}
        placeholderTextColor="#999"
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}
      >
        <Pressable
          style={[styles.chip, !category && styles.chipActive]}
          onPress={() => onChangeCategory(undefined)}
        >
          <Text style={[styles.chipText, !category && styles.chipTextActive]}>
            {ALL_CATEGORIES_LABEL}
          </Text>
        </Pressable>

        {NEWS_CATEGORIES.map((item) => (
          <Pressable
            key={item}
            style={[styles.chip, category === item && styles.chipActive]}
            onPress={() => onChangeCategory(item)}
          >
            <Text
              style={[
                styles.chipText,
                category === item && styles.chipTextActive,
              ]}
            >
              {CATEGORY_LABELS[item]}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}
      >
        {DATE_FILTERS.map((item) => (
          <Pressable
            key={item}
            style={[styles.chip, dateFilter === item && styles.chipActive]}
            onPress={() => onChangeDateFilter(item)}
          >
            <Text
              style={[
                styles.chipText,
                dateFilter === item && styles.chipTextActive,
              ]}
            >
              {DATE_FILTER_LABELS[item]}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
