export type ProfileBoxLinkProps = {
    navigate: () => void,
    icon: string | JSX.Element,
    title: string,
    count: number;
    rangeValue?: number
}