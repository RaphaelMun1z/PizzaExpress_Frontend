import { canSSRAuth } from "../../utils/canSSRAuth"

const Dashboard = () => {
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {

    }
  }
})