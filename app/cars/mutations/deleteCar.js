import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const DeleteCar = z.object({
  id: z.number(),
})
export default resolver.pipe(resolver.zod(DeleteCar), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const car = await db.car.deleteMany({
    where: {
      id,
    },
  })
  return car
})
