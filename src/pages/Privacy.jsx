// src/pages/Privacy.jsx
import { Card } from '../components/ui';
import { Shield, Lock, Eye, Database, UserCheck, FileText } from 'lucide-react';

export const Privacy = () => {
  return (
    <div className="section-padding">
      <div className="container-max max-w-4xl">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="hero-title mb-4">Política de Privacidad</h1>
          <p className="text-gray-600">Última actualización: Noviembre 2024</p>
        </div>

        <Card className="prose max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                <FileText className="w-6 h-6 text-primary-600" />
                <span>1. Introducción</span>
              </h2>
              <p className="text-gray-700 leading-relaxed">
                En Manos Expertas, respetamos tu privacidad y nos comprometemos a proteger tus datos personales.
                Esta política de privacidad explica cómo recopilamos, usamos, compartimos y protegemos tu información
                cuando utilizas nuestros servicios.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                <Database className="w-6 h-6 text-primary-600" />
                <span>2. Información que Recopilamos</span>
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold mb-2">2.1 Información que nos proporcionas:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Nombre completo y datos de contacto (email, teléfono)</li>
                    <li>Dirección postal para la prestación de servicios</li>
                    <li>Información de pago y facturación</li>
                    <li>Preferencias de servicios y comunicaciones</li>
                    <li>Contenido de mensajes y comunicaciones con nosotros</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">2.2 Información recopilada automáticamente:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Datos de uso de la plataforma (páginas visitadas, tiempo de navegación)</li>
                    <li>Información del dispositivo (tipo, sistema operativo, navegador)</li>
                    <li>Dirección IP y datos de ubicación aproximada</li>
                    <li>Cookies y tecnologías similares</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                <Eye className="w-6 h-6 text-primary-600" />
                <span>3. Cómo Usamos tu Información</span>
              </h2>
              <div className="text-gray-700">
                <p className="mb-3">Utilizamos tu información para:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Facilitar la prestación de servicios y conectarte con profesionales</li>
                  <li>Procesar pagos y gestionar tu cuenta</li>
                  <li>Comunicarnos contigo sobre tus reservas y servicios</li>
                  <li>Mejorar nuestros servicios y desarrollar nuevas funcionalidades</li>
                  <li>Enviarte información marketing (solo si has dado tu consentimiento)</li>
                  <li>Cumplir con obligaciones legales y resolver disputas</li>
                  <li>Detectar y prevenir fraudes y actividades maliciosas</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                <UserCheck className="w-6 h-6 text-primary-600" />
                <span>4. Compartir tu Información</span>
              </h2>
              <div className="text-gray-700">
                <p className="mb-3">Podemos compartir tu información con:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Profesionales:</strong> Compartimos la información necesaria para completar el servicio</li>
                  <li><strong>Proveedores de servicios:</strong> Empresas que nos ayudan a operar (procesadores de pago, hosting)</li>
                  <li><strong>Autoridades:</strong> Cuando la ley lo requiera o para proteger nuestros derechos</li>
                  <li><strong>Transferencias empresariales:</strong> En caso de fusión, adquisición o venta de activos</li>
                </ul>
                <p className="mt-3">
                  <strong>No vendemos</strong> tu información personal a terceros.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                <Lock className="w-6 h-6 text-primary-600" />
                <span>5. Seguridad de tus Datos</span>
              </h2>
              <div className="text-gray-700">
                <p className="mb-3">Implementamos medidas de seguridad técnicas y organizativas apropiadas:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cifrado SSL/TLS para todas las transmisiones de datos</li>
                  <li>Almacenamiento seguro con cifrado de datos sensibles</li>
                  <li>Controles de acceso estrictos y autenticación de dos factores</li>
                  <li>Auditorías de seguridad regulares</li>
                  <li>Capacitación continua del personal en seguridad de datos</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Tus Derechos</h2>
              <div className="text-gray-700">
                <p className="mb-3">De acuerdo con el RGPD, tienes derecho a:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Acceso:</strong> Solicitar una copia de tus datos personales</li>
                  <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
                  <li><strong>Supresión:</strong> Solicitar la eliminación de tus datos</li>
                  <li><strong>Limitación:</strong> Restringir el procesamiento de tus datos</li>
                  <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado</li>
                  <li><strong>Oposición:</strong> Oponerte al procesamiento de tus datos</li>
                  <li><strong>Retirar consentimiento:</strong> En cualquier momento</li>
                </ul>
                <p className="mt-3">
                  Para ejercer estos derechos, contáctanos en: <a href="mailto:privacidad@manosexpertas.es" className="text-primary-600 hover:underline">privacidad@manosexpertas.es</a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Retención de Datos</h2>
              <p className="text-gray-700 leading-relaxed">
                Conservamos tus datos personales solo durante el tiempo necesario para los fines descritos
                en esta política o según lo requiera la ley. Los datos de transacciones se conservan durante
                al menos 7 años por obligaciones fiscales y contables.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Cookies</h2>
              <p className="text-gray-700 leading-relaxed">
                Utilizamos cookies y tecnologías similares. Para más información, consulta nuestra{' '}
                <a href="/cookies" className="text-primary-600 hover:underline">Política de Cookies</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Menores de Edad</h2>
              <p className="text-gray-700 leading-relaxed">
                Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos conscientemente
                información de menores. Si descubres que un menor nos ha proporcionado datos, contáctanos
                inmediatamente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Cambios en esta Política</h2>
              <p className="text-gray-700 leading-relaxed">
                Podemos actualizar esta política ocasionalmente. Te notificaremos de cambios significativos
                por email o mediante un aviso destacado en nuestra plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Contacto</h2>
              <div className="text-gray-700">
                <p className="mb-2">Para cualquier pregunta sobre esta política, contáctanos:</p>
                <ul className="space-y-1">
                  <li><strong>Email:</strong> <a href="mailto:privacidad@manosexpertas.es" className="text-primary-600 hover:underline">privacidad@manosexpertas.es</a></li>
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
