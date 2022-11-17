import Head from 'next/head'
import styles from '../../styles/home.module.scss'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

export default function Home() {
  return (
    <>
      <Head>
        <title>Acesse sua conta</title>
      </Head>
      <div className={styles.containerCenter}>
        <h1>NG.CA$H</h1>

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
              Acessar
            </Button>            
          </form>

          <a className={styles.text}>Cadastre-se</a>
          
        </div>
      </div>
    </>
  )
}
