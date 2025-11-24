// src/components/auth/LoginForm.jsx
import { useState } from 'react';
import { Button, Input } from '../ui';
import { useAuth } from '../../context/AuthContext';

export const LoginForm = ({ onSuccess, onModeChange }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const { login, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validation simple
    const newErrors = {};
    if (!formData.email) newErrors.email = 'El email es requerido';
    if (!formData.password) newErrors.password = 'La contraseña es requerida';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await login(formData);
    if (result.success) {
      onSuccess?.();
    } else {
      setErrors({ general: result.error });
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h2>
      
      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {errors.general}
        </div>
      )}

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="tu@email.com"
      />

      <Input
        label="Contraseña"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="••••••••"
      />

      <Button
        type="submit"
        loading={loading}
        className="w-full"
      >
        Iniciar sesión
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => onModeChange?.('register')}
          className="text-primary-600 hover:text-primary-700 text-sm"
        >
          ¿No tienes cuenta? Regístrate aquí
        </button>
      </div>
    </form>
  );
};

