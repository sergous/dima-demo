import { Link, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createCar from "app/cars/mutations/createCar"
import { CarForm, FORM_ERROR } from "app/cars/components/CarForm"

const NewCarPage = () => {
  const router = useRouter()
  const [createCarMutation] = useMutation(createCar)
  return (
    <div>
      <h1>Create New Car</h1>

      <CarForm
        submitText="Create Car" // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateCar}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const car = await createCarMutation(values)
            router.push(
              Routes.ShowCarPage({
                carId: car.id,
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

      <p>
        <Link href={Routes.CarsPage()}>
          <a>Cars</a>
        </Link>
      </p>
    </div>
  )
}

NewCarPage.authenticate = true

NewCarPage.getLayout = (page) => <Layout title={"Create New Car"}>{page}</Layout>

export default NewCarPage
