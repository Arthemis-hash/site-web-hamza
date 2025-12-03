// src/pages/Cookies.jsx
import { Card, Button } from '../components/ui';
import { Cookie } from 'lucide-react';

export const Cookies = () => {
  return (
    <div className="section-padding">
      <div className="container-max max-w-4xl">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Cookie className="w-8 h-8 text-white" />
          </div>
          <h1 className="hero-title mb-4">Política de Cookies</h1>
          <p className="text-gray-600">Última actualización: Noviembre 2024</p>
        </div>

        <Card className="prose max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. ¿Qué son las Cookies?</h2>
              <p className="text-gray-700 leading-relaxed">
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas
                nuestro sitio web. Ayudan a mejorar tu experiencia al recordar tus preferencias y proporcionar
                funcionalidades adicionales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Tipos de Cookies que Utilizamos</h2>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Cookies Esenciales</h3>
                  <p className="text-gray-700 mb-2">
                    Necesarias para el funcionamiento básico del sitio. No se pueden desactivar.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Autenticación de sesión</li>
                    <li>Seguridad y prevención de fraudes</li>
                    <li>Carrito de compras</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Cookies de Rendimiento</h3>
                  <p className="text-gray-700 mb-2">
                    Nos ayudan a entender cómo los usuarios interactúan con el sitio.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Google Analytics (análisis de tráfico)</li>
                    <li>Métricas de rendimiento del sitio</li>
                    <li>Identificación de errores técnicos</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Cookies Funcionales</h3>
                  <p className="text-gray-700 mb-2">
                    Permiten funcionalidades mejoradas y personalizadas.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Preferencias de idioma</li>
                    <li>Configuración de interfaz</li>
                    <li>Historial de búsqueda</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Cookies de Marketing</h3>
                  <p className="text-gray-700 mb-2">
                    Utilizadas para mostrar publicidad relevante.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Seguimiento de conversiones</li>
                    <li>Publicidad personalizada</li>
                    <li>Retargeting</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Cookies de Terceros</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Algunos de nuestros socios también establecen cookies en tu dispositivo:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Google Analytics:</strong> Para análisis de tráfico y comportamiento</li>
                <li><strong>Stripe/PayPal:</strong> Para procesamiento seguro de pagos</li>
                <li><strong>Redes Sociales:</strong> Para compartir contenido y análisis social</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Gestión de Cookies</h2>
              <div className="text-gray-700">
                <p className="mb-3">Puedes controlar y gestionar las cookies de varias formas:</p>

                <div className="bg-primary-50 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold mb-2">Panel de Preferencias</h3>
                  <p className="mb-3">
                    Utiliza nuestro panel de preferencias de cookies para activar o desactivar categorías
                    específicas (excepto las esenciales).
                  </p>
                  <Button>Gestionar Preferencias de Cookies</Button>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Configuración del Navegador</h3>
                  <p className="mb-2">También puedes gestionar cookies a través de la configuración de tu navegador:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Chrome</a></li>
                    <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Firefox</a></li>
                    <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Safari</a></li>
                    <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Edge</a></li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Duración de las Cookies</h2>
              <div className="text-gray-700">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Cookies de sesión:</strong> Se eliminan cuando cierras el navegador</li>
                  <li><strong>Cookies persistentes:</strong> Permanecen hasta su fecha de caducidad o hasta que las elimines manualmente</li>
                  <li><strong>Nuestras cookies:</strong> Pueden durar desde la sesión hasta 2 años, dependiendo de su propósito</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Impacto de Desactivar Cookies</h2>
              <p className="text-gray-700 leading-relaxed">
                Ten en cuenta que desactivar ciertas cookies puede afectar tu experiencia en el sitio:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                <li>Algunas funcionalidades pueden no estar disponibles</li>
                <li>Deberás iniciar sesión cada vez que visites el sitio</li>
                <li>Tus preferencias no se guardarán</li>
                <li>La experiencia puede ser menos personalizada</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Actualizaciones</h2>
              <p className="text-gray-700 leading-relaxed">
                Podemos actualizar esta política de cookies ocasionalmente para reflejar cambios en
                las tecnologías que utilizamos o requisitos legales. Te recomendamos revisar esta
                página periódicamente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Más Información</h2>
              <div className="text-gray-700">
                <p className="mb-2">Para más información sobre cómo protegemos tus datos, consulta:</p>
                <ul className="space-y-1">
                  <li><a href="/privacidad" className="text-primary-600 hover:underline">Política de Privacidad</a></li>
                  <li><a href="/terminos" className="text-primary-600 hover:underline">Términos y Condiciones</a></li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Contacto</h2>
              <div className="text-gray-700">
                <p className="mb-2">Si tienes preguntas sobre nuestra política de cookies:</p>
                <ul className="space-y-1">
                  <li><strong>Email:</strong> <a href="mailto:privacidad@manosexpertas.es" className="text-primary-600 hover:underline">privacidad@manosexpertas.es</a></li>
                  <li><strong>Teléfono:</strong> +34 900 123 456</li>
                </ul>
              </div>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
};
