import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const CreateCar = z.object({
  name: z.string(),
  model: z.string(),
  year: z.number(),
  vin: z.number(),
  color: z.string(),
})
export default resolver.pipe(resolver.zod(CreateCar), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const car = await db.car.create({
    data: input,
  })
  return car
})
