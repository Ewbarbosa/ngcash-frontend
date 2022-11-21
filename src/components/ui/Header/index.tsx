import { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import styles from './styles.module.scss'
import Link from 'next/link'
import { FiLogOut } from 'react-icons/fi'

export function Header() {

  const { signOut } = useContext(AuthContext);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard" className={styles.logo}>
          NG.CA$H
        </Link>

        <nav className={styles.menuNav}>
          <Link href="/transfer">
            Transferência
          </Link>

          <Link href="/extract">
            Extrato
          </Link>

          <button onClick={signOut}>
            <FiLogOut color='#fff' size={24} />
          </button>
        </nav>
      </div>
    </header>
  )
}