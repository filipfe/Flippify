import { shadowPrimary } from "../styles/general";

export default function useShadow(num: number) {
  return {
    ...shadowPrimary,
    elevation: num,
  };
}
