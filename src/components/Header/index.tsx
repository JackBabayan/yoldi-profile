'use client';

import { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Buttons';
import { Avatar } from '@/components/Avatar';
import { useAuthStore } from '@/store/auth';

import styles from './styles.module.scss';

export const Header = () => {
    const { user, isLoggedIn, winWidth, setWindowWidth } = useAuthStore();
    const [mounted, setMounted] = useState(false);
    

    useEffect(() => {
        setMounted(true);

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [setWindowWidth]);

    if (!mounted) {
        return (
            <header className={styles.header}>
                <div className={styles.container}>
                    <div className={styles.logo}>
                        <Image src={"/logo-wrapper.png"} alt={'Yoldi'} width={80} height={50} quality={100} />
                    </div>
                    <div className={styles.auth} />
                </div>
            </header>
        );
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href={isLoggedIn ? "/all-accounts" : "/login"} className={styles.logo}>
                    <Image src={"/logo-wrapper.png"} alt={'Yoldi'} width={80} height={50} quality={100} />
                    {winWidth >= 768 && (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: "Разрабатываем и запускаем <br/>сложные веб проекты"
                            }}
                            className={styles.tagline}
                        />
                    )}
                </Link>

                <div className={styles.auth}>
                    {isLoggedIn && user ? (
                        <Link href="/account" className={styles.profile}>
                            <span>{user.name}</span>
                            <Avatar
                                src={user?.image?.url}
                                user={user}
                                alt={user.name}
                                initial={user.name.charAt(0)}
                                editable={false}
                            />
                        </Link>
                    ) : (
                        <Button href="/login" variant={'secondary'} className={styles.loginBtn}>
                            Войти
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
};