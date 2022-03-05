import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCar from "app/cars/queries/getCar"
import deleteCar from "app/cars/mutations/deleteCar"
export const Car = () => {
  const router = useRouter()
  const carId = useParam("carId", "number")
  const [deleteCarMutation] = useMutation(deleteCar)
  const [car] = useQuery(getCar, {
    id: carId,
  })
  return (
    <>
      <Head>
        <title>Car {car.id}</title>
      </Head>

      <div>
        <h1>{car.name}</h1>

        <em>VIN: {car.vin}</em>
        <div>Цвет: {car.color}</div>
        <div>Год: {JSON.stringify(car.year)}</div>

        <hr />

        {/* <pre>{JSON.stringify(car, null, 2)}</pre> */}

        <Link
          href={Routes.EditCarPage({
            carId: car.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteCarMutation({
                id: car.id,
              })
              router.push(Routes.CarsPage())
            }
          }}
          style={{
            marginLeft: "0.5rem",
          }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowCarPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.CarsPage()}>
          <a>Cars</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Car />
      </Suspense>
    </div>
  )
}

ShowCarPage.authenticate = true

ShowCarPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowCarPage
