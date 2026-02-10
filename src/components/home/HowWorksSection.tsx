import HowWorksCard from "../HowWorksCard";

interface HowWorksItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const list: HowWorksItem[] = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-10 text-tropical-rain-forest-800"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        />
      </svg>
    ),
    title: "Reporta una mascota perdida",
    description:
      "Sube una foto y marca la ubicación donde se perdió para que otros usuarios puedan reconocerla y ayudarte a difundir la búsqueda dentro de la comunidad.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-10 text-tropical-rain-forest-800"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    ),
    title: "Explora mascotas perdidas cerca tuyo",
    description:
      "Accede a los reportes activos según tu ubicación y mantente atento a posibles coincidencias cuando veas mascotas en la calle o en tu barrio.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-10 text-tropical-rain-forest-800"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
        />
      </svg>
    ),
    title: "Avisa si encuentras una mascota",
    description:
      "Si crees haber visto una mascota reportada, puedes enviar un aviso directamente al dueño con la ubicación del avistamiento para facilitar el reencuentro.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-10 text-tropical-rain-forest-800"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    ),
    title: "Registrate y ayuda a otros",
    description:
      "Para reportar mascotas perdidas o enviar avisos de avistamientos es necesario tener una cuenta creada, lo que permite mantener una comunicación segura entre usuarios.",
  },
];

const HowWorksSection = () => {
  return (
    <section className="w-full flex flex-col bg-[#e6f5f0]">
      <h1 className="text-4xl font-bold text-center mt-10">Cómo funciona</h1>
      <h2 className="text-lg text-center text-gray-700 mt-4 mb-10 px-10">
        Nuestro simple proceso conecta mascotas perdidas con sus familias
      </h2>
      <div className="grid gap-5 md:grid-cols-2 px-10 md:px-15 lg:grid-cols-4 mb-20">
        {list.map((item) => (
          <HowWorksCard
            key={item.title}
            title={item.title}
            description={item.description}
          >
            {item.icon}
          </HowWorksCard>
        ))}
      </div>
    </section>
  );
};

export default HowWorksSection;
