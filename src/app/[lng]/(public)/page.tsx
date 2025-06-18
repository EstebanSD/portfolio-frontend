import { serverTranslation } from '@/lib/i18n';

type Props = {
  params: Promise<{ lng: string }>;
};
export default async function HomePage({ params }: Props) {
  const { lng } = await params;
  const { t } = await serverTranslation(lng, 'common');

  return (
    <div>
      <h1 className="text-center">{t('welcome')}</h1>

      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 text-shadow">
            Hola, soy <span className="text-accent-500 font-medium">Desarrollador</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Full Stack Developer especializado en React, Next.js y tecnologías modernas. Creando
            experiencias web excepcionales con código limpio y diseño elegante.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#projects"
              className="bg-accent-500 text-white px-8 py-3 rounded-lg hover:bg-accent-600 transition-all hover-lift font-medium"
            >
              Ver Proyectos
            </a>
            <a
              href="#contact"
              className="border-2 border-accent-500 text-accent-500 px-8 py-3 rounded-lg hover:bg-accent-500 hover:text-white transition-all font-medium"
            >
              Contactar
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
