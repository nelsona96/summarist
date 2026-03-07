export type RatingValue = 1 | 2 | 3 | 4 | 5;

export interface ReviewData {
  name: string;
  message: React.ReactNode;
  rating: RatingValue;
}
