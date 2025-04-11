import { AccountForm } from '../AccountForm';
import { User } from '@/lib/types';
import styles from './styles.module.scss';

interface EditProfileModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<User>) => Promise<void>;
  isLoading: boolean;
}

export const EditProfileModal = ({ 
  user, 
  isOpen, 
  onClose, 
  onSubmit, 
  isLoading 
}: EditProfileModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <AccountForm
          user={user}
          onSubmit={onSubmit}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};