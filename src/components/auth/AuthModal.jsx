// src/components/auth/AuthModal.jsx
import { Modal } from '../ui';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export const AuthModal = ({ isOpen, onClose, mode, onModeChange }) => {
  const handleSuccess = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
    >
      {mode === 'login' ? (
        <LoginForm 
          onSuccess={handleSuccess}
          onModeChange={onModeChange}
        />
      ) : (
        <RegisterForm 
          onSuccess={handleSuccess}
          onModeChange={onModeChange}
        />
      )}
    </Modal>
  );
};
