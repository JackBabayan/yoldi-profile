import { useState } from 'react';
import Image from 'next/image';
import { PhotoIcon } from '@/styles/icon';
import { User } from '@/lib/types';
import { updateProfile, uploadImage } from '@/lib/api';

import styles from './styles.module.scss';

interface AvatarProps {
  user?: User;
  src?: string | null;
  alt?: string;
  size?: 'small' | 'big';
  editable?: boolean;
  initial?: string;
  onUpload?: (data: Partial<User>) => Promise<void>;

}
export const Avatar = ({
  user,
  alt = 'Avatar',
  size = 'small',
  editable = false,
  initial,
  onUpload
}: AvatarProps) => {
  const [image, setImage] = useState<string | null>(user?.image?.url || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];
    if (!file.type.includes('image/')) return;

    try {
      const uploadedImage = await uploadImage(file);

      const updatedUser = await updateProfile({
        ...user,
        imageId: uploadedImage.id,
      });

      setImage(uploadedImage.url);
      onUpload?.(updatedUser);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      e.target.value = '';
    }
  };

  return (
    <div className={`${styles.avatar} ${styles[size]} ${editable ? styles.editable : ''}`}>
      {image && (
        <Image
          src={image}
          alt={alt}
          width={size === 'big' ? 100 : 32}
          height={size === 'big' ? 100 : 32}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      )}
      
      <div className={styles.placeholder}>
        {initial && !image && <span>{initial}</span>}
        <div className={styles.placeholderIcon}><PhotoIcon /></div>
      </div>

      {editable && (
        <input
          type="file"
          id="avatar-upload"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.fileInput}
        />
      )}
    </div>
  );
};
