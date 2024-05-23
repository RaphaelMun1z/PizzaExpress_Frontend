import { ChangeEvent, useState, FormEvent } from 'react'
import styles from './Styles.module.scss'
import Head from 'next/head'
import Header from '../../components/Header'

import { canSSRAuth } from '../../utils/canSSRAuth'

import { FiUpload } from 'react-icons/fi'

import { setupAPIClient } from "../../services/api"

import { toast } from 'react-toastify'

type ItemProps = {
    id: string
    name: string
}

interface CategoryProps {
    categoryList: ItemProps[]
}

const Product = ({ categoryList }: CategoryProps) => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")

    const [avatarUrl, setAvatarUrl] = useState("")
    const [imageAvatar, setImageAvatar] = useState<File | null>(null);

    const [categories, setCategories] = useState(categoryList || [])
    const [categorySelected, setCategorySelected] = useState()

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return
        }

        const image = e.target.files[0]

        if (!image) {
            return
        }

        if (image.type === "image/jpeg" || image.type === "image/png") {
            setImageAvatar(image)
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    function handleChangeCategory(event) {
        setCategorySelected(event.target.value)
    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault()

        try {
            const data = new FormData()

            if (!name || name.trim() === "") {
                return toast.error("Preencha o campo nome!")
            }

            if (!price || price.trim() === "") {
                return toast.error("Preencha o campo preço!")
            }

            if (!description || description.trim() === "") {
                return toast.error("Preencha o campo descrição!")
            }

            if (!imageAvatar || imageAvatar === null) {
                return toast.error("Escolha uma imagem!")
            }

            data.append('name', name)
            data.append('price', price)
            data.append('description', description)
            data.append('category_id', categories[categorySelected].id)
            data.append('file', imageAvatar)

            const apiClient = setupAPIClient()

            await apiClient.post('/product', data)

            toast.success("Cadastrado com sucesso!")
        } catch (error) {
            console.log(error)
            toast.error("Erro ao cadastrar!")
        }

        setName("")
        setPrice("")
        setDescription("")
        setImageAvatar(null)
        setAvatarUrl("")
    }

    return (
        <>
            <Head>
                <title>Novo produto - Pizza Express</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>
                    <h1>Novo produto</h1>
                    <form className={styles.form} onSubmit={handleRegister}>

                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload color='#fff' size={30} />
                            </span>

                            <input type="file" accept='image/png, image/jpeg' onChange={handleFile} />

                            {avatarUrl && (
                                <img
                                    className={styles.preview}
                                    src={avatarUrl}
                                    alt="Foto do produto"
                                    width={250}
                                    height={250}
                                />
                            )}

                        </label>

                        <select value={categorySelected} onChange={handleChangeCategory}>
                            {categories.map((item, index) => {
                                return (
                                    <option value={index} key={item.id}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>
                        <input
                            type="text"
                            placeholder="Digite o nome do produto"
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Preço do produto"
                            className={styles.input}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <textarea
                            placeholder="Descreva seu produto..."
                            className={styles.input}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <button className={styles.buttonAdd} type='submit'>
                            Cadastrar
                        </button>
                    </form>
                </main>
            </div>
        </>
    )
}

export default Product

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get("/category")

    return {
        props: {
            categoryList: response.data
        }
    }
})