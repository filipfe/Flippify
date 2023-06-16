export type ProfileBoxLinkProps = {
    navigate: () => void,
    icon: string | JSX.Element,
    title: string,
    subtitle: string,
    rangeValue?: number
}