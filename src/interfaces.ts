export interface GameProps {
  id: number;
  name: string;
  background_image: string;
  genres: { id: number; name: string }[];
  parent_platforms: {
    platform: {
      id: number;
      name:
        | "PC"
        | "PlayStation"
        | "Xbox"
        | "Android"
        | "Linux"
        | "Nintendo"
        | "Apple Macintosh"
        | "iOS"
        | "Web";
    };
  }[];
  rating: number;
  ratings: {
    id: number;
    title: "recommended" | "exceptional" | "skip" | "meh";
  }[];
  released: string;
  metacritic: number;
  playtime: number;
  colors: string[];
}
