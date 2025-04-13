'use client';

import { useState } from 'react';
import { Avatar } from '@/components/Avatar';
import { Cover } from '@/components/Cover';
import { EditProfileModal } from '@/components/EditProfileModal';
import Button from '@/components/Buttons';
import { Loader } from '@/components/Loader';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/types';

import { EditIcon, LogoutIcon } from '@/styles/icon';
import styles from './styles.module.scss';

export default function Account() {
  const router = useRouter();
  const { user, winWidth, loading, logout, updateProfile } = useAuthStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
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


  if (loading || !user) return <Loader />


  return (
    winWidth < 768 && isModalOpen ?
      <EditProfileModal
        user={user}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
      :
      <section className={'pageWrapper'}>

        <Cover
          user={user}
          onSubmit={handleSubmit}
        />

        <div className={styles.profileContainer}>
          <div className={styles.profileHeader}>
            <Avatar
              src={user.image?.url || null}
              alt={"Аватарка пользователя"}
              size="big"
              editable
              user={user}
              initial={user.name.charAt(0)}
            />
          </div>

          <div className={styles.profileInfoCont}>
            <div className={styles.profileActions}>

              <div className={styles.profileInfo}>
                <h1 className={styles.userName}>{user.name}</h1>
                <span className={styles.userEmail}>{user.slug}</span>
              </div>

              <div>
                <Button
                  variant={'secondary'}
                  onClick={handleEditClick}
                >
                  <EditIcon />
                  Редактировать
                </Button>
              </div>

            </div>

            {user.description && (
              <div className={styles.userDescription}>
                <p>{user.description}</p>
              </div>
            )}
          </div>
          <div>
            <Button
              variant={'secondary'}
              onClick={handleLogout}
            >
              <LogoutIcon />
              Выйти
            </Button>
          </div>
        </div>

        <EditProfileModal
          user={user}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />
      </section>
  );
}