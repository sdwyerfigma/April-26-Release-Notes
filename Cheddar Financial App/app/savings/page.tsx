import { CheddarSavings } from "../../components/cheddar-savings";

type SavingsPageProps = {
  searchParams: Promise<{ state?: string | string[] | undefined }>;
};

export default async function SavingsPage({ searchParams }: SavingsPageProps) {
  const params = await searchParams;
  const captureState =
    typeof params.state === "string" ? params.state : Array.isArray(params.state) ? params.state[0] : undefined;

  return <CheddarSavings captureState={captureState} />;
}
