import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCar from "app/cars/queries/getCar"
import updateCar from "app/cars/mutations/updateCar"
import { CarForm, FORM_ERROR } from "app/cars/components/CarForm"
export const EditCar = () => {
  const router = useRouter()
  const carId = useParam("carId", "number")
  const [car, { setQueryData }] = useQuery(
    getCar,
    {
      id: carId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateCarMutation] = useMutation(updateCar)
  return (
    <>
      <Head>
        <title>Edit Car {car.id}</title>
      </Head>

      <div>
        <h1>Edit Car {car.id}</h1>
        <pre>{JSON.stringify(car, null, 2)}</pre>

        <CarForm
          submitText="Update Car" // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateCar}
          initialValues={car}
          onSubmit={async (values) => {
            try {
              const updated = await updateCarMutation({
                id: car.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(
                Routes.ShowCarPage({
                  carId: updated.id,
                })
              )
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditCarPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCar />
      </Suspense>

      <p>
        <Link href={Routes.CarsPage()}>
          <a>Cars</a>
        </Link>
      </p>
    </div>
  )
}

EditCarPage.authenticate = true

EditCarPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditCarPage
