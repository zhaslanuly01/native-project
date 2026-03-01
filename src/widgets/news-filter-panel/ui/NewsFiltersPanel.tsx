import React from "react";
import { View } from "react-native";

import {
  Category,
  CategoryChips,
  DateFilter,
  DateFilterChips,
  NewsSearchInput,
} from "@/src/features/news-filters";
import { styles } from "./NewsFiltersPanel.styles";

type Props = {
  searchQuery: string;
  onChangeSearchQuery: (value: string) => void;
  category: Category | undefined;
  onChangeCategory: (value: Category | undefined) => void;
  dateFilter: DateFilter;
  onChangeDateFilter: (value: DateFilter) => void;
};

export function NewsFiltersPanel({
  searchQuery,
  onChangeSearchQuery,
  category,
  onChangeCategory,
  dateFilter,
  onChangeDateFilter,
}: Props) {
  return (
    <View style={styles.container}>
      <NewsSearchInput value={searchQuery} onChange={onChangeSearchQuery} />
      <CategoryChips value={category} onChange={onChangeCategory} />
      <DateFilterChips value={dateFilter} onChange={onChangeDateFilter} />
    </View>
  );
}
