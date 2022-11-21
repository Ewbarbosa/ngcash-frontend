import { canSSRAuth } from "../../utils/canSSRAuth";
import Head from "next/head";
import { Header } from "../../components/ui/Header";
import { setupApiClient } from "../../services/api";
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

import { FiRefreshCcw } from 'react-icons/fi'

import styles from './styles.module.scss'
import { api } from "../../services/apiClient";

type Extracts = {
  id: number;
  value: number;
  createdAt: Date;
  debitedAccountId: number
  creditedAccountId: number;
}

interface ExtractProps {
  extracts: Extracts[];
}

export default function Extract({ extracts }: ExtractProps) {

  const [extractList, setExtractList] = useState(extracts || []);

  const apiClient = setupApiClient();

  return (
    <>
      <Head>
        <title>Extrato - NG.CA$H</title>
      </Head>
      <Header />

      <div className={styles.container}>

        <div className={styles.extract}>
          <h1>
            Extrato de transferências
          </h1>
          <button>
            <FiRefreshCcw color="#fff" />
          </button>
        </div>

        <article className={styles.extractItem}>
          {extractList.map(item => (
            <section key={item.id}>
              <p>
                ID: {item.id}
              </p>
              <p>
                De: {item.creditedAccountId}
              </p>
              <p>
                Para: {item.debitedAccountId}
              </p>
              <p>
                Valor: {item.value}
              </p>
            </section>
          ))}
        </article>
      </div >
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  const api = setupApiClient(ctx);

  const response = await api.get('/transfers');

  //console.log(response);

  return {
    props: {
      extracts: response.data
    }
  }
})