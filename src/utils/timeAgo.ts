/**
 * Calcula el tiempo transcurrido desde una fecha dada y lo devuelve en formato legible.
 * Ejemplo: "30 minutos", "1 hora", "2 días", "1 semana", "3 meses"
 */
export const getTimeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: "año", plural: "años", seconds: 31536000 },
    { label: "mes", plural: "meses", seconds: 2592000 },
    { label: "semana", plural: "semanas", seconds: 604800 },
    { label: "día", plural: "días", seconds: 86400 },
    { label: "hora", plural: "horas", seconds: 3600 },
    { label: "minuto", plural: "minutos", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${count === 1 ? interval.label : interval.plural}`;
    }
  }

  return "unos segundos";
};
