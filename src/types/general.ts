export type Button = {
  onPress?: () => void;
  text: string;
  active?: boolean;
  style?: any
};    
  
export type Category = {
  id: number,
  name: string;
  icon: string;
}