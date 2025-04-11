'use client';

import { useEffect } from "react";

import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Buttons';

import { useAuthStore } from '@/store/auth';

import styles from './styles.module.scss';

interface HeaderProps {
    isLoggedIn?: boolean;
    isAuthPage?: boolean;
}

export const Header = ({ isLoggedIn, isAuthPage }: HeaderProps) => {

    const { user , winWidth, setWindowWidth } = useAuthStore();

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [setWindowWidth]);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href={isLoggedIn ? "/accounts-list" : "/"} className={styles.logo}>
                    <Image src={"/logo-wrapper.png"} alt={'Yoldi'} width={80} height={50} quality={100} />
                    {
                        winWidth >= 768 &&
                        <div dangerouslySetInnerHTML={{ __html: "Разрабатываем и запускаем <br/>сложные веб проекты" }} className={styles.tagline} />
                    }
                </Link>

                <div className={styles.auth}>
                    {isLoggedIn ? (
                        <div className={styles.profile}>
                            <span>{user?.name}</span>
                            <Link href="/account" className={styles.avatar}>
                                {user?.image?.url ? (
                                    <Image src={user?.image?.url} alt={user?.name} width={32} height={32} />
                                ) : (
                                    <div className={styles.initials}>{user?.name.charAt(0)}</div>
                                )}
                            </Link>
                        </div>
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