import { getBudget } from "@/lib/gcloud/budget"

export default async function Page() {
  const budget = await getBudget()

  return (
    <div>{budget.amount.specifiedAmount.units.toString()} {budget.amount.specifiedAmount.currencyCode}</div>
  )
}
