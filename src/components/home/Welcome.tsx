import { Link } from "react-router-dom";
const Welcome = () => {
  return (
    <section className="bg-tropical-rain-forest-25 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Ayuda a reunir mascotas con sus familias
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground text-gray-700">
              Únete a nuestra comunidad para devolver mascotas perdidas a casa.
              Crea una cuenta para reportar tu mascota perdida y recibir
              notificaciones cuando sea vista.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to="/reportpet"
                className="bg-tropical-rain-forest-800 text-white text-base px-8 lg rounded-lg py-1.5 cursor-pointer hover:bg-tropical-rain-forest-700 transition-colors duration-300 whitespace-nowrap flex items-center justify-center"
              >
                Reportar Mascota Perdida
              </Link>
              <Link
                to="/lostpets"
                className="text-base px-8 border-2 hover:bg-accent bg-white rounded-lg py-1 border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors duration-300 whitespace-nowrap flex items-center justify-center"
              >
                Reportar Avistamiento
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src="/home image.webp"
              alt="Pareja feliz reunida con su perro y gato"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
