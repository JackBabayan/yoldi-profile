'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImgIcon, UploadIcon, RemoveIcon } from '@/styles/icon';
import Button from '@/components/Buttons';
import { User } from '@/lib/types';
import { updateProfile , uploadImage} from '@/lib/api';

import styles from './styles.module.scss';

interface CoverProps {
  user: User;
  onSubmit: (data: Partial<User>) => Promise<void>;
}

export const Cover = ({user, onSubmit}: CoverProps) => {
  const [image, setImage] = useState<string | null>(user?.cover?.url || null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];
    if (!file.type.includes('image/')) {
      return;
    }

    try {
      setIsLoading(true);
      // Загрузка изображения на сервер
      const uploadedImage = await uploadImage(file);


      const updatedUser = await updateProfile({
        ...user,
        coverId: uploadedImage.id,
      });

      setImage(uploadedImage.url);
      onSubmit(updatedUser);
    } catch (error) {
      console.error('Error uploading cover:', error);
    } finally {
      setIsLoading(false);
      e.target.value = '';
    }
  };

  const handleDeleteCover = async () => {
    try {
      setIsLoading(true);
      const updatedUser = await updateProfile({ 
        name: user.name,
        email: user.email,
        description: user.description,
        slug: user.slug,
        image: user.image,
        coverId: null
      });
      setImage(null); 
      onSubmit(updatedUser);
    } catch (error) {
      console.error('Error deleting cover:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.cover}>
      {image && (
        <div className={styles.coverImage}>
          <Image
            src={image}
            alt="Cover"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}

      {image ? (
        <Button
          variant={'secondary'}
          onClick={handleDeleteCover}
          disabled={isLoading}
        >
          <RemoveIcon />
          {isLoading ? 'Удаление...' : 'Удалить'}
          <ImgIcon />
        </Button>
      ) : (
        <Button
          variant={'secondary'}
          disabled={isLoading}
        >
          <UploadIcon />
          {isLoading ? 'Загрузка...' : 'Загрузить'}
          <ImgIcon />
          <input
            type="file"
            id="cover-upload"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
            disabled={isLoading}
          />
        </Button>
      )}
    </div>
  );
};
