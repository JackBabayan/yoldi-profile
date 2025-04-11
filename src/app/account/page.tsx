'use client';

import { useState } from 'react';
import { FiEdit2, FiLogOut } from 'react-icons/fi';
import { Avatar } from '@/components/Avatar';
import { Cover } from '@/components/Cover';
import { EditProfileModal } from '@/components/EditProfileModal';
import { useAuthStore } from '@/store/auth';
import { User } from '@/lib/types';
import styles from '@/styles/Account.module.scss';

export default function Account() {
  const { user, loading, logout, updateProfile } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (data: Partial<User>) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      await updateProfile(data);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !user) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  return (
    <>
      <Cover src={user.cover?.url} />
      
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <Avatar 
            src={user.image?.url} 
            alt={user.name} 
            size="big" 
            initial={user.name.charAt(0)} 
          />
          
          <div className={styles.profileActions}>
            <button onClick={handleEditClick} className={styles.editButton}>
              <FiEdit2 />
              <span>Редактировать</span>
            </button>
            
            <button className={styles.logoutButton} onClick={handleLogout}>
              <FiLogOut />
              <span>Выйти</span>
            </button>
          </div>
        </div>
        
        <div className={styles.profileInfo}>
          <h1 className={styles.userName}>{user.name}</h1>
          <p className={styles.userEmail}>{user.email}</p>
          
          {user.description && (
            <div className={styles.userDescription}>
              <p>{user.description}</p>
            </div>
          )}
        </div>
      </div>

      <EditProfileModal 
        user={user}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
    </>
  );
}