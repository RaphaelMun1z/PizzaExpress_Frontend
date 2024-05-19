import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss"

import logoImg from "../../public/logo.png"

import { Input } from "../components/ui/Input";

export default function Home() {
  return (
    <>
      <Head>
        <title>PizzaExpress - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Pizza Express" />
        <div className={styles.login}>
          <form>
            <Input placeholder="Digite seu e-mail" type="text" />
            <Input placeholder="Digite sua senha" type="password" />
          </form>
        </div>
      </div>
    </>
  );
}