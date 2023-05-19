import { Style } from "tailwind-rn/dist";

export type Button = {
  onPress: () => void;
  text: string;
  active?: boolean;
  style?: string | Style;
};    
  
export type Category = {
  name: string;
  image: string;
}