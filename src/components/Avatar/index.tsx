import { useState } from 'react';
import Image from 'next/image';
import { FiUser, FiUpload } from 'react-icons/fi';
import styles from './styles.module.scss';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'big';
  editable?: boolean;
  initial?: string;
  onUpload?: (file: File) => void;
}

export const Avatar = ({ 
  src, 
  alt = 'Avatar', 
  size = 'small',
  editable = false,
  initial,
  onUpload
}: AvatarProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onUpload) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div 
      className={`${styles.avatar} ${styles[size]} ${editable ? styles.editable : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {src ? (
        <Image src={src} alt={alt} width={size === 'big' ? 80 : 32} height={size === 'big' ? 80 : 32} />
      ) : (
        <div className={styles.placeholder}>
          {initial ? initial : <FiUser />}
        </div>
      )}
      
      {editable && (
        <>
          <label 
            className={`${styles.uploadOverlay} ${isHovered ? styles.visible : ''}`}
            htmlFor="avatar-upload"
          >
            <FiUpload />
          </label>
          <input 
            type="file" 
            id="avatar-upload" 
            accept="image/*" 
            onChange={handleFileChange}
            className={styles.fileInput}
          />
        </>
      )}
    </div>
  );
};