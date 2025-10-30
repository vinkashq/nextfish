import { BudgetServiceClient } from "@google-cloud/billing-budgets"
import { getBillingInfo } from "./billing";

const client = new BudgetServiceClient();

const getBudget = async () => {
  const parent = (await getBillingInfo()).billingAccountName
  const budgets = await client.listBudgets({
    parent,
  })
  const name = budgets[0][0].name
  console.log(name)

  const [budget] = await client.getBudget({
    name,
  });

  return budget;
}

export {
  getBudget
}
