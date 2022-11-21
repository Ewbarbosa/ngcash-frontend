import { canSSRAuth } from '../../utils/canSSRAuth'
import Head from 'next/head'
import { Header } from '../../components/ui/Header'
import { setupApiClient } from '../../services/api'

import styles from './styles.module.scss'

export default function Dashboard({ balance }) {

  //console.log(balance);

  return (
    <>
      <Head>
        <title>Painel - NG.CA$H</title>
      </Head>
      <Header />
      <div className={styles.container}>
        <a className={styles.balance}>
          Saldo: R${balance.balance}
        </a>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  const api = setupApiClient(ctx);

  const response = await api.get('/balance');

  //console.log(response);

  return {
    props: {
      balance: response.data
    }
  }
})