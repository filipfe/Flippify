import { shadowPrimary } from "../styles/general";

export default function useShadow(num: number = 12) {
  return {
    ...shadowPrimary,
    elevation: num,
  };
}
