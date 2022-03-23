export const getDate = (createdAt: string) => {
    let date = new Date(createdAt);
    return (
        date
            .toLocaleString("ru", {
                day: "numeric",
                month: "long",
                year: "numeric",
            })
            .slice(0, -3) +
        " в " +
        date.toLocaleString("ru", {
            hour: "2-digit",
            minute: "2-digit",
        })
    );
};
export const calcWidth = (widthDiv: number) => {
    return (widthDiv / 4 - 60) * 2 - 41;
}
export const getNameValues = (name: string) => localStorage.getItem(name);