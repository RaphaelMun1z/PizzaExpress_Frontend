import { useContext } from 'react'
import styles from './Styles.module.scss'
import Link from 'next/link'

import { FiLogOut } from 'react-icons/fi'
import { AuthContext } from '../../contexts/AuthContext'

const Header = () => {
    const { signOut } = useContext(AuthContext)

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <img src='/logo.png' width={190} height={60} />
                </Link>

                <nav>
                    <Link href="/category">
                        <p>Categoria</p>
                    </Link>

                    <Link href="/product">
                        <p>Cardápio</p>
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color='#fff' size={24} />
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Header