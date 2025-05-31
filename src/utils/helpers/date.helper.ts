export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  }

  const formatter = new Intl.DateTimeFormat("es-ES", options)
  return formatter.format(date)
}