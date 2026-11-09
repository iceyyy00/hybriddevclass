

const MONTHS = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
];

const SHORT_MONTHS = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
];

export const formatNumber = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const formatRupiah = (n: number) => `Rp ${formatNumber(n)}`;

export const formatLongDate = (date: Date) => `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

export const formatShortDate = (date: Date) => `${date.getDate()} ${SHORT_MONTHS[date.getMonth()]} ${date.getFullYear()}`;

export const formatTime = (d: Date) => {
    const h = d.getHours();
    const m = d.getMinutes();
    const suffix = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${m.toString().padStart(2, "0")} ${suffix}`;
};