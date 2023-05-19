import { ProfileStackParams } from "./navigation"

export type ProfileBoxLinkProps = {
    to: keyof ProfileStackParams,
    icon: string | JSX.Element,
    title: string,
    subtitle: string,
    rangeValue?: number
}