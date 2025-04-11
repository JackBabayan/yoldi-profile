import { useState } from 'react';
import Button from '@/components/Buttons';

import { PersonalIcon, EayIcon, LockerIcon, MailIcon } from '@/styles/icon';
import styles from './styles.module.scss';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (data: { email: string; password: string; name?: string }) => void;
  isLoading?: boolean;
}

export const AuthForm = ({ type, onSubmit, isLoading = false }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      password: ''
    };

    if (type === 'register' && !formData.name.trim()) {
      newErrors.name = 'Имя обязательно';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const isFormFilled = () => {
    if (type === 'login') {
      return formData.email.trim() !== '' && formData.password.trim() !== '';
    }
    return formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.password.trim() !== '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className={styles.authFormContainer}>
      <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: type === 'login' ? 'Вход в Yoldi Agency' : 'Регистрация <br/>в Yoldi Agency' }} />

      <form className={styles.form} onSubmit={handleSubmit}>
        {type === 'register' && (
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <PersonalIcon />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Имя"
                className={`${styles.input} ${errors.name ? styles.error : ''}`}
              />
            </div>
            {errors.name && <div className={styles.errorMessage}>{errors.name}</div>}
          </div>
        )}

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <MailIcon />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-mail"
              className={`${styles.input} ${errors.email ? styles.error : ''}`}
            />
          </div>
          {errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <LockerIcon />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Пароль"
              className={`${styles.input} ${errors.password ? styles.error : ''}`}
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EayIcon /> : <EayIcon />}
            </button>
          </div>
          {errors.password && <div className={styles.errorMessage}>{errors.password}</div>}
        </div>

        <Button
          className={styles.btnSubmit}
          type="submit"
          variant={'primary'}
          disabled={isLoading || !isFormFilled()}
        >
          {isLoading ? 'Загрузка...' : type === 'login' ? 'Войти' : 'Создать аккаунт'}
        </Button>
      </form>
    </div>
  );
};