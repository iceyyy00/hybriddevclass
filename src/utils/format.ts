export const formatRupiah = (n: number) => 
    "Rp " + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");