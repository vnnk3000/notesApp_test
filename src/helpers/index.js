export const generateDate = () => {
    let date = new Date(Date.now());
    const month = date.toLocaleString('default', { month: 'long' }),
        day = date.getDate(),
        year = date.getFullYear(),
        hour = date.getHours(),
        min = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`


        console.log(day);

    return `${month} ${day}, ${year}, ${hour}:${min}`
}