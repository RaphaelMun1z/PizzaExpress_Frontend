import { ReactNode, ButtonHTMLAttributes } from 'react'
import styles from './Styles.module.scss'

import { FaSpinner } from 'react-icons/fa'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean,
    children: ReactNode
}

const Button = ({ loading, children, ...rest }: ButtonProps) => {
    return (
        <button className={styles.button} disabled={loading} {...rest}>
            {loading ? (
                <FaSpinner color='#fff' size={16} />
            ) : (
                <a className={styles.buttonText}>{children}</a>
            )}
        </button >
    )
}

export {
    Button
}