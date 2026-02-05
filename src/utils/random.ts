export const getDifferentRandomIndex = (
    length: number,
    lastIndex: number | null
): number => {
    if (length <= 1) return 0;

    let index;
    do {
        index = Math.floor(Math.random() * length);
    } while (index === lastIndex);

    return index;
};