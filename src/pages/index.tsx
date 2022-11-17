import Head from 'next/head'
import styles from '../../styles/home.module.scss'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

import { FormEvent, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

import Link from 'next/link'

export default function Home() {

  const { signIn } = useContext(AuthContext);    

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    let data = {
      username: "teste@teste.com",
      password: "102030"
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
            />
            <Input
              placeholder='Digite sua senha'
            />

            <Button
              type="submit"
              loading={false}
            >
              Acessar
            </Button>
          </form>

          <Link className={styles.text} href="/signup">
            Ainda não é cliente? Abra sua conta agora mesmo.
          </Link>
        </div>
      </div>
    </>
  )
}
