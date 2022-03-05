import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { number } from "zod"
export { FORM_ERROR } from "app/core/components/Form"
export function CarForm(props) {
  return (
    <Form {...props}>
      <LabeledTextField name="name" label="Название" placeholder="Название" />
      <LabeledTextField name="model" label="Модель" placeholder="Модель" />
      <LabeledTextField name="color" label="Цвет" placeholder="Цвет" />
      <LabeledTextField name="vin" label="VIN" placeholder="Вин" />
      <LabeledTextField name="year" label="Год" placeholder="Год" />
    </Form>
  )
}
