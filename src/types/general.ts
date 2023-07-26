import { User } from "./auth";

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

export type Children = {
  children: JSX.Element
}

export type Notification = {
  id: number;
  type: 'note' | 'flashcard';
  user: User | null;
  created_at: Date;
}

export type NotificationTimeFrame = {
  timeFrame: number;
  notes: Notification[]
}