function formatDate(dateString: string): string {
  const date = new Date(dateString)

  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0') // Mês começa do 0
  const year = date.getUTCFullYear()

  return `${day}/${month}/${year}`
}

export default formatDate
