export const formatValue = (value) => {

    if (!value) return "-";

    return value
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());

};

export const getStatusDisplay = (status) => {
    switch (status) {
        case 'VALID':
            return '✅ Valid'
        case 'UPCOMING':
            return '⚠️ Upcoming'
        case 'EXPIRED':
            return '❌ Expired'
        case 'NO_DUE_DATE':
            return '➖ No Due Date'
        default:
            return '-'
    }
}