export type RootTabParamList = {
  NewsList: undefined;
  Favorites: undefined;
};

export type RootStackParamList = {
  RootTabs: undefined;
  NewsDetails: {
    articleUrl: string;
    title?: string;
  };
};
