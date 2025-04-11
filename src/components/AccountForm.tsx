import { useState, useEffect } from 'react';
import { User } from '@/lib/types';
import Button from '@/components/Buttons';

import styles from '@/styles/AccountForm.module.scss';

interface AccountFormProps {
  user: User;
  onSubmit: (data: Partial<User>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const AccountForm = ({ user, onSubmit, onCancel, isLoading = false }: AccountFormProps) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    description: user.description || ''
  });
  const [errors, setErrors] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    setFormData({
      name: user.name || '',
      description: user.description || ''
    });
  }, [user]);

  const validateForm = () => {
    const newErrors = {
      name: '',
      description: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Очищаем ошибку при вводе
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
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Редактировать профиль</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Имя</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Владислав"
            className={`${styles.input} ${errors.name ? styles.error : ''}`}
          />
          {errors.name && <div className={styles.errorMessage}>{errors.name}</div>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Адрес профиля</label>
          <div className={styles.slugWrapper}>
            <span className={styles.slugPrefix}>yoldi.agency/</span>
            <input
              type="text"
              name="slug"
              value={user.slug || ''}
              disabled
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Описание</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Напишите немного о себе..."
            className={`${styles.textarea} ${errors.description ? styles.error : ''}`}
          />
          {errors.description && <div className={styles.errorMessage}>{errors.description}</div>}
        </div>

        <div className={styles.formActions}>
          <Button
            type="button"
            variant={'primary'}
            onClick={onCancel}
          >
            Отмена
          </Button>

          <Button
            variant={'primary'}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </div>
      </form>
    </div>
  );
};