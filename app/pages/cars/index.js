import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCars from "app/cars/queries/getCars"
const ITEMS_PER_PAGE = 100
export const CarsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ cars, hasMore }] = usePaginatedQuery(getCars, {
    orderBy: {
      id: "asc",
    },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () =>
    router.push({
      query: {
        page: page - 1,
      },
    })

  const goToNextPage = () =>
    router.push({
      query: {
        page: page + 1,
      },
    })

  return (
    <div>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            <Link
              href={Routes.ShowCarPage({
                carId: car.id,
              })}
            >
              <a>{car.name}</a>
            </Link>{" "}
            - Цвет: {car.color} - VIN: {car.vin}
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const CarsPage = () => {
  return (
    <>
      <Head>
        <title>Cars</title>
      </Head>

      <div>
        <p>
          <Link href="/">
            <button className="button small">Главная</button>
          </Link>
          <br />
          <Link href={Routes.NewCarPage()}>
            <button className="button small">Create Car</button>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <CarsList />
        </Suspense>
      </div>
      <style>
        <style jsx global>{`
          .button {
            font-size: 1rem;
            background-color: #6700eb;
            padding: 1rem 2rem;
            color: #f4f4f4;
            text-align: center;
          }

          .button.small {
            padding: 0.5rem 1rem;
          }

          .button:hover {
            background-color: #45009d;
          }

          .button-outline {
            border: 2px solid #6700eb;
            padding: 1rem 2rem;
            color: #6700eb;
            text-align: center;
          }

          .button-outline:hover {
            border-color: #45009d;
            color: #45009d;
          }
        `}</style>
      </style>
    </>
  )
}

CarsPage.authenticate = true

CarsPage.getLayout = (page) => <Layout>{page}</Layout>

export default CarsPage
