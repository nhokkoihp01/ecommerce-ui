export const convertCurrency = (currency) => {
    return currency?.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
}

export function convertDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${day}/${month}/${year}`;
}