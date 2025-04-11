'use client';

import { useEffect, useState, use } from 'react';
import { User } from '@/lib/types';
import { Avatar } from '@/components/Avatar';
import { getUserBySlug } from '@/lib/api';
import { Cover } from '@/components/Cover';

import styles from './styles.module.scss';

export default function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  console.log(user);
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserBySlug(slug);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [slug]);

  if (loading) return <div className={'loading'}>Загрузка...</div>;

  if (!user) {
    return <div className={'error'}>Пользователь не найден</div>;
  }

  return (
    <section className={'pageWrapper'}>
      <Cover
        user={user}
      />

      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <Avatar
            src={user.image?.url || null}
            alt={"Аватарка пользователя"}
            size="big"
            user={user}
            initial={user.name.charAt(0)}
          />
        </div>

        <div className={styles.profileInfoCont}>
          <div className={styles.profileActions}>
            <div className={styles.profileInfo}>
              <h1 className={styles.userName}>{user.name}</h1>
              <span className={styles.userEmail}>{user.email}</span>
            </div>
          </div>

          {user.description && (
            <div className={styles.userDescription}>
              <p>{user.description}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 