import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.scss"

import logoImg from "../../../public/logo.png"

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import Link from "next/link";

export default function Signup() {
    return (
        <>
            <Head>
                <title>Faça seu cadastro agora!</title>
            </Head>
            <div className={styles.containerCenter}>
                <Image src={logoImg} alt="Logo Pizza Express" />
                <div className={styles.login}>
                    <h1>Criando sua conta</h1>
                    <form>
                        <Input placeholder="Digite seu nome" type="text" />
                        <Input placeholder="Digite seu e-mail" type="text" />
                        <Input placeholder="Digite sua senha" type="password" />
                        <Button type="submit" loading={false}>
                            Cadastrar
                        </Button>
                    </form>

                    <Link href="/">
                        <p className={styles.text}>Já possui uma conta? Acessar.</p>
                    </Link>

                </div>
            </div>
        </>
    );
}