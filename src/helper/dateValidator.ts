export function isDateFormatValid(date: string): boolean {
    const dateRegExp = /^(0[1-9]|1[0-2])\/(\d{2})$/;
    return dateRegExp.test(date);
}
export function isCardDateValid(date: string): boolean {
    if (!isDateFormatValid(date)) {
        return false;
    }

    const [month, year] = date.split('/').map(Number);

    // Получаем текущую дату
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Месяцы в JavaScript начинаются с 0
    const currentYear = currentDate.getFullYear() % 100; // Получаем последние два числа года

    // Проверяем, что карта не истекла
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return false;
    }

    return true;
}
