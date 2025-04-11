import { ReactNode, ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon';
  children: ReactNode;
  href?: string | null | undefined
}

export default function Button({ 
  variant = 'primary', 
  children, 
  href, 
  className, 
  ...props 
}: ButtonProps) {
  const variantStyles = {
    primary: styles.primary,
    secondary: styles.secondary,
    icon: styles.icon,
  };

  const buttonClassName = `${styles.baseStyles} ${variantStyles[variant]} ${className || ''}`;

  if (href) {
    return (
      <Link href={href} className={buttonClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button 
      className={buttonClassName} 
      {...props}
    >
      {children}
    </button>
  );
}