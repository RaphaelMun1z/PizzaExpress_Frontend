import { FormEvent, useState } from 'react'
import styles from './Styles.module.scss'
import Head from 'next/head'
import Header from '../../components/Header'

import { setupAPIClient } from '../../services/api'
import { toast } from 'react-toastify'

import { canSSRAuth } from '../../utils/canSSRAuth'

const index = () => {
    const [name, setName] = useState("")

    async function handleRegister(event: FormEvent) {
        event.preventDefault()

        if (!name || name.trim() === "") {
            return
        }

        const apiClient = setupAPIClient()
        await apiClient.post("/category", {
            name: name
        })

        toast.success("Categoria cadastrada com sucesso!")
        setName("")
    }

    return (
        <>
            <Head>
                <title>Nova Categoria - Pizza Express</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>
                    <h1>Cadastrar categorias</h1>
                    <form className={styles.form} onSubmit={handleRegister}>
                        <input
                            type="text"
                            placeholder='Digite o nome da categoria'
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <button type='submit' className={styles.buttonAdd}>
                            Cadastrar
                        </button>
                    </form>
                </main>
            </div>
        </>
    )
}

export default index

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})