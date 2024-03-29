import { User } from "./auth";
import { Topic } from "./flashcards";

export type Button = {
  onPress?: () => void;
  text?: string;
  active?: boolean;
  style?: any;
  width?: string | number;
  fontSize?: number;
  borderRadius?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  children?: string | JSX.Element | JSX.Element[];
};

export type Category = {
  id: number | null;
  name: string;
  icon: string;
  topics: { count: number };
};

export type Option<T> = {
  value: T;
  label: string;
};

export type Children = {
  children: JSX.Element;
};

export type Notification = {
  id: number;
  source: "flashcards" | null;
  type: "like" | "promotion";
  was_seen: boolean;
  initiator: User;
  created_at: Date;
};

export type Filter = {
  search: string;
  category: Category;
  topic: Topic;
};
