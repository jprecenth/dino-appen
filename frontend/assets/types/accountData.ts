export type AccountData = {
  username: string;
  accountCreation: string;
  results: {
    points: number;
    created_at: string;
    resultID: number;
  }[];
  favourites: string[]
}
