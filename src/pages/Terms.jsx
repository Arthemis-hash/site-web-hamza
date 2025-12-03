// src/pages/Terms.jsx
import { Card } from '../components/ui';
import { FileText } from 'lucide-react';

export const Terms = () => {
  return (
    <div className="section-padding">
      <div className="container-max max-w-4xl">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="hero-title mb-4">Términos y Condiciones</h1>
          <p className="text-gray-600">Última actualización: Noviembre 2024</p>
        </div>

        <Card className="prose max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Aceptación de los Términos</h2>
              <p className="text-gray-700 leading-relaxed">
                Al acceder y utilizar la plataforma Manos Expertas, aceptas estar sujeto a estos términos
                y condiciones, todas las leyes y regulaciones aplicables. Si no estás de acuerdo con alguno
                de estos términos, no debes utilizar nuestros servicios.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Descripción del Servicio</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Manos Expertas es una plataforma digital que conecta a usuarios con profesionales verificados
                para servicios del hogar. Actuamos como intermediarios y facilitadores, pero no somos
                empleadores ni prestadores directos de servicios.
              </p>
              <div className="text-gray-700">
                <p className="mb-2">Nuestros servicios incluyen:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Listado y búsqueda de profesionales</li>
                  <li>Sistema de reservas y programación</li>
                  <li>Procesamiento seguro de pagos</li>
                  <li>Sistema de reseñas y calificaciones</li>
                  <li>Soporte al cliente</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Registro y Cuenta de Usuario</h2>
              <div className="text-gray-700 space-y-3">
                <div>
                  <h3 className="font-semibold mb-2">3.1 Requisitos de Registro:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Debes tener al menos 18 años</li>
                    <li>Proporcionar información precisa y actualizada</li>
                    <li>Mantener la confidencialidad de tu contraseña</li>
                    <li>Notificar inmediatamente cualquier uso no autorizado</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">3.2 Responsabilidades:</h3>
                  <p>Eres responsable de todas las actividades que ocurran bajo tu cuenta.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Uso de la Plataforma</h2>
              <div className="text-gray-700">
                <h3 className="font-semibold mb-2">4.1 Uso Permitido:</h3>
                <p className="mb-3">Te comprometes a utilizar la plataforma únicamente para:</p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Buscar y contratar servicios profesionales</li>
                  <li>Proporcionar servicios como profesional verificado</li>
                  <li>Comunicarte de manera respetuosa y profesional</li>
                </ul>

                <h3 className="font-semibold mb-2">4.2 Uso Prohibido:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Usar la plataforma para actividades ilegales</li>
                  <li>Intentar eludir el sistema de pagos</li>
                  <li>Compartir información falsa o engañosa</li>
                  <li>Acosar, amenazar o discriminar a otros usuarios</li>
                  <li>Copiar o usar contenido sin autorización</li>
                  <li>Interferir con el funcionamiento de la plataforma</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Reservas y Pagos</h2>
              <div className="text-gray-700 space-y-3">
                <div>
                  <h3 className="font-semibold mb-2">5.1 Proceso de Reserva:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Las reservas están sujetas a disponibilidad</li>
                    <li>Los precios se muestran claramente antes de la confirmación</li>
                    <li>El pago se procesa al confirmar la reserva</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">5.2 Pagos:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Todos los pagos se procesan de forma segura</li>
                    <li>Los precios incluyen IVA según corresponda</li>
                    <li>Podemos aplicar comisiones de servicio</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">5.3 Modificaciones:</h3>
                  <p>Puedes modificar tu reserva hasta 4 horas antes sin coste adicional.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Cancelaciones y Reembolsos</h2>
              <div className="text-gray-700">
                <h3 className="font-semibold mb-2">6.1 Cancelaciones del Cliente:</h3>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Más de 2 horas antes: Reembolso del 100%</li>
                  <li>Menos de 2 horas: Penalización del 50%</li>
                  <li>No presentación: Sin reembolso</li>
                </ul>

                <h3 className="font-semibold mb-2">6.2 Cancelaciones del Profesional:</h3>
                <p className="mb-2">
                  Si un profesional cancela, recibirás un reembolso completo y ayuda para encontrar
                  un reemplazo.
                </p>

                <h3 className="font-semibold mb-2 mt-4">6.3 Reembolsos:</h3>
                <p>Los reembolsos se procesan en 5-7 días laborables al método de pago original.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Garantías y Reclamaciones</h2>
              <div className="text-gray-700">
                <p className="mb-3">Ofrecemos una garantía de satisfacción del 100%:</p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Si no estás satisfecho, trabajaremos para resolverlo</li>
                  <li>Las reclamaciones deben presentarse dentro de 7 días</li>
                  <li>Requerimos documentación (fotos, descripciones)</li>
                </ul>
                <p>
                  Los profesionales están asegurados para cubrir daños accidentales durante el servicio.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Limitación de Responsabilidad</h2>
              <div className="text-gray-700">
                <p className="mb-3">
                  Manos Expertas actúa como intermediario. No somos responsables de:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>La calidad de los servicios prestados por profesionales</li>
                  <li>Daños o pérdidas causados por profesionales</li>
                  <li>Disputas entre usuarios y profesionales</li>
                  <li>Interrupciones del servicio de la plataforma</li>
                  <li>Pérdida de datos o contenido</li>
                </ul>
                <p className="mt-3">
                  En cualquier caso, nuestra responsabilidad se limita al monto pagado por el servicio
                  específico.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Propiedad Intelectual</h2>
              <div className="text-gray-700">
                <p className="mb-3">
                  Todo el contenido de la plataforma (textos, imágenes, logos, código) es propiedad de
                  Manos Expertas o sus licenciantes.
                </p>
                <p>
                  No puedes copiar, modificar, distribuir o usar nuestro contenido sin autorización
                  expresa por escrito.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Privacidad y Datos Personales</h2>
              <p className="text-gray-700 leading-relaxed">
                El manejo de tus datos personales se rige por nuestra{' '}
                <a href="/privacidad" className="text-primary-600 hover:underline">
                  Política de Privacidad
                </a>
                , que forma parte integral de estos términos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Modificaciones de los Términos</h2>
              <p className="text-gray-700 leading-relaxed">
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios
                significativos se notificarán por email. El uso continuado de la plataforma después de
                los cambios constituye la aceptación de los nuevos términos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Terminación</h2>
              <div className="text-gray-700">
                <p className="mb-3">Podemos suspender o terminar tu cuenta si:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Violas estos términos</li>
                  <li>Usas la plataforma de manera fraudulenta</li>
                  <li>Lo consideramos necesario para proteger nuestros servicios</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">13. Ley Aplicable y Jurisdicción</h2>
              <p className="text-gray-700 leading-relaxed">
                Estos términos se rigen por las leyes de España. Cualquier disputa se resolverá en los
                tribunales de Jaén, España, renunciando a cualquier otro fuero que pudiera corresponder.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">14. Contacto</h2>
              <div className="text-gray-700">
                <p className="mb-2">Para preguntas sobre estos términos:</p>
                <ul className="space-y-1">
                  <li><strong>Email:</strong> <a href="mailto:legal@manosexpertas.es" className="text-primary-600 hover:underline">legal@manosexpertas.es</a></li>
                  <li><strong>Teléfono:</strong> +34 900 123 456</li>
                  <li><strong>Dirección:</strong> Jaén, España</li>
                </ul>
              </div>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
};
