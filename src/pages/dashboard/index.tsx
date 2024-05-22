import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from "next/head"

import Header from "../../components/Header"

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Painel - Pizza Express</title>
      </Head>
      <div>
        <Header />
        <h1>Painel</h1>
      </div>
    </>
  )
}

export default Dashboard

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {

    }
  }
})