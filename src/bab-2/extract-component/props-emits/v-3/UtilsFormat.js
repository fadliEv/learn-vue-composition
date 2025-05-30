function formatRupiah(number) {
  if (typeof number !== 'number') return '-'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number)
}


export {
  formatRupiah
}