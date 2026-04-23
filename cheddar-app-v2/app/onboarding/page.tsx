import { CheddarOnboardingFlow, type OnboardingStepId } from "../../onboarding/cheddar-onboarding-flow";

type OnboardingPageProps = {
  searchParams: Promise<{ step?: string | string[] | undefined }>;
};

const VALID_STEPS: OnboardingStepId[] = ["connect", "goals", "tracking", "completed"];

export default async function OnboardingPage({ searchParams }: OnboardingPageProps) {
  const params = await searchParams;
  const rawStep = typeof params.step === "string" ? params.step : Array.isArray(params.step) ? params.step[0] : undefined;
  const initialStep = VALID_STEPS.includes(rawStep as OnboardingStepId) ? (rawStep as OnboardingStepId) : undefined;

  return <CheddarOnboardingFlow initialStep={initialStep} />;
}
