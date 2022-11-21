import { canSSRAuth } from "../../utils/canSSRAuth";
import Head from "next/head";
import { Header } from "../../components/ui/Header";
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { setupApiClient } from "../../services/api";
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

import styles from './styles.module.scss'

export default function Transfer() {

  const [username, setUsername] = useState('');
  const [value, setValue] = useState(0);

  async function handleTransfer(event: FormEvent) {
    event.preventDefault();

    if (username === '') {
      toast.warning('Preencha os campos para realizar a transferência')
      return;
    }

    if (value < 0) {
      toast.warning('O valor deve ser maior que zero.')
      return;
    }

    const api = setupApiClient();

    try {
      const response = await api.post('/transfer', {
        userCashIn: username,
        value: value
      })

      toast.warning('Transferência realizada')
      //console.log(response.data);

      setUsername('');
      setValue(0);
    } catch (err) {
      toast.warning('Não foi possível realizar a transferência')
    }

  }
  return (
    <>
      <Head>
        <title>Transferir - NG.CA$H</title>
      </Head>
      <Header />

      <div className={styles.container}>
        <h1>
          Transferencia entre contas
        </h1>

        <div className={styles.transfer}>
          <form onSubmit={handleTransfer}>
            <Input
              placeholder='Usuário de quem irá receber'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder='Valor'
              type='number'
              value={value}
              onChange={(e) => setValue(parseInt(e.target.value))}
            />
            <Button
              type="submit"
            >
              Transferir
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  return {
    props: {}
  }
})