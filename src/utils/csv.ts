export const parseCSV = <T>(
    csvText: string,
    mapper: (row: string[]) => T
): T[] => {
    return csvText
        .split("\n")
        .slice(1)
        .map(r => r.trim())
        .filter(Boolean)
        .map(row => mapper(row.split(",")));
};
