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
  id: number | null,
  name: string;
  icon: string;
}

export type Option<T> = {
  value: T
  label: string
}