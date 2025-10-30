import { projectId } from '@/firebase/const';
import { CloudBillingClient } from '@google-cloud/billing';

const client = new CloudBillingClient();

const getBillingInfo = async () => {
  const [billingInfo] = await client.getProjectBillingInfo({
    name: `projects/${projectId}`,
  });
  return billingInfo;
}

export {
  getBillingInfo
}
