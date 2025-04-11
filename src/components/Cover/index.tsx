import { useState } from 'react';
import Image from 'next/image';
import { FiUpload } from 'react-icons/fi';
import styles from './Cover.module.scss';

interface CoverProps {
  src?: string;
  editable?: boolean;
  onUpload?: (file: File) => void;
}

export const Cover = ({ src, editable = false, onUpload }: CoverProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onUpload) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div 
      className={`${styles.cover} ${editable ? styles.editable : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {src ? (
        <div className={styles.coverImage}>
          <Image src={src} alt="Cover" fill style={{ objectFit: 'cover' }} />
        </div>
      ) : (
        <div className={styles.placeholder}>
          {editable && (
            <button className={styles.uploadBtn}>
              <FiUpload />
              <span>Загрузить</span>
            </button>
          )}
        </div>
      )}
      
      {editable && src && (
        <>
          <label 
            className={`${styles.uploadOverlay} ${isHovered ? styles.visible : ''}`}
            htmlFor="cover-upload"
          >
            <FiUpload />
            <span>Заменить</span>
          </label>
          <input 
            type="file" 
            id="cover-upload" 
            accept="image/*" 
            onChange={handleFileChange}
            className={styles.fileInput}
          />
        </>
      )}
    </div>
  );
};