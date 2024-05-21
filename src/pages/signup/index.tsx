import { useState, FormEvent, useContext } from "react";

import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.scss"

import logoImg from "../../../public/logo.png"

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

import Link from "next/link";

export default function Signup() {
    const { signUp } = useContext(AuthContext)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false)

    async function handleSignup(event: FormEvent) {
        event.preventDefault()

        if (!name || name.trim() === "") {
            toast.error("Preencha o campo nome!")
            return
        }

        if (!email || email.trim() === "") {
            toast.error("Preencha o campo email!")
            return
        }

        if (!password || password.trim() === "") {
            toast.error("Preencha o campo senha!")
            return
        }

        setLoading(true)

        let data = {
            name,
            email,
            password
        }

        await signUp(data)

        setLoading(false)
    }

    return (
        <>
            <Head>
                <title>Faça seu cadastro agora!</title>
            </Head>
            <div className={styles.containerCenter}>
                <Image src={logoImg} alt="Logo Pizza Express" />
                <div className={styles.login}>
                    <h1>Criando sua conta</h1>
                    <form onSubmit={handleSignup}>
                        <Input
                            placeholder="Digite seu nome"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            placeholder="Digite seu e-mail"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="Digite sua senha"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            loading={loading}
                        >
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