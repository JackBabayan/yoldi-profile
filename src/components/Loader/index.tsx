'use client';

import { LoaderIcon } from '@/styles/icon';

import styles from './styles.module.scss';

interface LoaderProps {
    type?: string;
}

export const Loader = ({ type }: LoaderProps) => {
    return <div className={`${styles.loader} ${type && styles.global}`}> <LoaderIcon />Загрузка...</div>;
};