import Head from 'next/head'
import styles from '../../styles/home.module.scss'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { toast } from 'react-toastify'

import { canSSRGuest } from '../utils/CanSSRGuest'

import Link from 'next/link'

export default function Home() {

  const { signIn } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (username === '' || password === '') {
      toast.warning('Dados inválidos')
      //alert('Dados inválidos')
      return;
    }

    let data = {
      username,
      password
    }

    signIn(data);
  }

  return (
    <>
      <Head>
        <title>NG.CA$H - Acesse sua conta</title>
      </Head>
      <div className={styles.containerCenter}>
        <h1>NG.CA$H</h1>

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder='Digite seu username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder='Digite sua senha'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              loading={false}
            >
              Acessar
            </Button>
          </form>

          <Link className={styles.text} href="/signup">
            Abra sua conta
          </Link>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})