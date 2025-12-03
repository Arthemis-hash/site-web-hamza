// src/components/auth/RegisterForm.jsx
import { useState } from 'react';
import { Button, Input } from '../ui';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export const RegisterForm = ({ onSuccess, onModeChange }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'client',
    acceptTerms: false,
    acceptMarketing: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, loading } = useAuth();

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push('Mínimo 8 caracteres');
    if (!/[A-Z]/.test(password)) errors.push('Una mayúscula');
    if (!/[a-z]/.test(password)) errors.push('Una minúscula');
    if (!/[0-9]/.test(password)) errors.push('Un número');
    return errors;
  };

  const passwordStrength = formData.password ? validatePassword(formData.password) : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors = {};
    if (!formData.name) newErrors.name = 'El nombre es requerido';
    if (!formData.email) newErrors.email = 'El email es requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.phone) newErrors.phone = 'El teléfono es requerido';
    else if (!/^[+]?[0-9\s-()]{9,}$/.test(formData.phone)) {
      newErrors.phone = 'Teléfono inválido';
    }
    if (!formData.password) newErrors.password = 'La contraseña es requerida';
    else if (passwordStrength.length > 0) {
      newErrors.password = 'La contraseña no cumple los requisitos';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await register(formData);
    if (result.success) {
      onSuccess?.();
    } else {
      setErrors({ general: result.error });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Crear cuenta</h2>
        <p className="text-gray-600 text-sm">Únete a nuestra comunidad de expertos y clientes</p>
      </div>

      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {errors.general}
        </div>
      )}

      {/* User Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de cuenta
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, userType: 'client' }))}
            className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
              formData.userType === 'client'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            Soy Cliente
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, userType: 'professional' }))}
            className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
              formData.userType === 'professional'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            Soy Profesional
          </button>
        </div>
      </div>

      <Input
        label="Nombre completo"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="Juan Pérez"
        required
      />

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="tu@email.com"
        required
      />

      <Input
        label="Teléfono"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
        placeholder="+34 600 123 456"
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 pr-10 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {formData.password && (
          <div className="mt-2 space-y-1">
            {passwordStrength.length === 0 ? (
              <div className="flex items-center space-x-1 text-green-600 text-xs">
                <CheckCircle2 className="w-3 h-3" />
                <span>Contraseña segura</span>
              </div>
            ) : (
              <div className="text-xs text-gray-600 space-y-1">
                <p className="font-medium">Requisitos:</p>
                <ul className="space-y-0.5">
                  {passwordStrength.map((req, idx) => (
                    <li key={idx} className="text-red-600">• {req}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {errors.password && (
          <p className="mt-1 text-xs text-red-600">{errors.password}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirmar contraseña
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 pr-10 ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Terms and Marketing */}
      <div className="space-y-3">
        <label className="flex items-start space-x-2 cursor-pointer">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="mt-0.5 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="text-sm text-gray-700">
            Acepto los{' '}
            <a href="/terminos" target="_blank" className="text-primary-600 hover:underline">
              Términos y Condiciones
            </a>{' '}
            y la{' '}
            <a href="/privacidad" target="_blank" className="text-primary-600 hover:underline">
              Política de Privacidad
            </a>
          </span>
        </label>
        {errors.acceptTerms && (
          <p className="text-xs text-red-600">{errors.acceptTerms}</p>
        )}

        <label className="flex items-start space-x-2 cursor-pointer">
          <input
            type="checkbox"
            name="acceptMarketing"
            checked={formData.acceptMarketing}
            onChange={handleChange}
            className="mt-0.5 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="text-sm text-gray-700">
            Deseo recibir ofertas y novedades por email
          </span>
        </label>
      </div>

      <Button
        type="submit"
        loading={loading}
        className="w-full"
        disabled={loading}
      >
        {loading ? 'Creando cuenta...' : 'Crear cuenta'}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => onModeChange?.('login')}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          ¿Ya tienes cuenta? Inicia sesión aquí
        </button>
      </div>
    </form>
  );
};


