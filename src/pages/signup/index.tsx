import Head from 'next/head'

import styles from '../../../styles/home.module.scss'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

import Link from 'next/link'

export default function SignUp() {
  return (
    <>
      <Head>
        <title>NG.CA$H - Abertura de conta</title>
      </Head>
      <div className={styles.containerCenter}>
        <h1>Crie sua conta</h1>

        <div className={styles.login}>
          <form>
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
              Criar
            </Button>
          </form>

          <Link className={styles.text} href='/'>
            Já tenho uma conta.
          </Link>
        </div>
      </div>
    </>
  )
}
