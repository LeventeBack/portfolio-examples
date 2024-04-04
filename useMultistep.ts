import { useState } from "react";

export type StepValidator = () => boolean;
export type MultiStepperReturn<T> = ReturnType<typeof useMultiStep<T>>;

export default function useMultiStep<T>(
  defaultSteps: T[],
  isCurrentStepValid: StepValidator[] = []
) {
  const [steps, setSteps] = useState<T[]>(defaultSteps);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      if (isCurrentStepValid[i] && !isCurrentStepValid[i]()) return i;
      return i + 1;
    });
  }

  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    stepCount: steps.length,
    steps,
    setSteps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    next,
    back,
  };
}
