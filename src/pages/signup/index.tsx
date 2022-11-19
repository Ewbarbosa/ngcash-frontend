import Head from 'next/head'

import styles from '../../../styles/home.module.scss'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'

import Link from 'next/link'

export default function SignUp() {

  const { signUp } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignup(event: FormEvent) {
    event.preventDefault();

    const regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[a-z]){1})(?=(?:.*?[0-9]){1})/;

    // se não existir um email ou se for menor que 3 caracteres
    if ((!username) || (username.length < 3)) {
      //alert('O username deve conter no mínimo 3 caracteres')
      toast.warning('O username deve conter no mínimo 3 caracteres')
      return;
    }

    // verificar a forca da senha
    if (password.length < 8) {
      //alert('O password deve conter no mínimo 8 caracteres')
      toast.warning('O password deve conter no mínimo 8 caracteres')
      setUsername('');
      setPassword('');
      return;
    }
    else if (!regex.exec(password)) {
      //alert('O password deve conter no mínimo 8 carateres, entre eles 1 letra maiúscula, 1 minúscula e 1 número')
      toast.warning('O password deve conter no mínimo 8 carateres, entre eles 1 letra maiúscula, 1 minúscula e 1 número')
      setUsername('');
      setPassword('');
      return;
    }

    let data = {
      username,
      password
    }

    signUp(data);
  }

  return (
    <>
      <Head>
        <title>NG.CA$H - Abertura de conta</title>
      </Head>
      <div className={styles.containerCenter}>
        <h1>Crie sua conta</h1>

        <div className={styles.login}>
          <form onSubmit={handleSignup}>
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
