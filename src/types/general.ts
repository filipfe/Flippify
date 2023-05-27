export type Button = {
  onPress?: () => void;
  text: string;
  active?: boolean;
  style?: any,
  width?: string | number,
  fontSize?: number,
  paddingVertical?: number,
    paddingHorizontal?: number,
};    
  
export type Category = {
  id: number,
  name: string;
  icon: string;
}