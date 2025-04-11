import { useState, useEffect } from 'react';
import { User } from '@/lib/types';
import Button from '@/components/Buttons';

import styles from './styles.module.scss';

interface AccountFormProps {
  user: User;
  onSubmit: (data: Partial<User>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const AccountForm = ({ user, onSubmit, onCancel, isLoading = false }: AccountFormProps) => {

  const [formData, setFormData] = useState({
    name: user.name || '',
    description: user.description || '',
    slug: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    slug: ''
  });

  useEffect(() => {
    setFormData({
      name: user.name || '',
      description: user.description || '',
      slug: user.slug || ''
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Редактировать профиль</h1>

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
            <span className={styles.slugPrefix}>example.com/</span>
            <input
              onChange={handleChange}
              type="text"
              name="slug"
              value={formData.slug}
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
            variant={'secondary'}
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