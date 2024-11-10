import { useState, useEffect } from "react";

export const useAddDelay = (input: string, delayTime: number): string => {
  const [delayValue, setDelayValue] = useState(input);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayValue(input);
    }, delayTime);
    return () => {
      clearTimeout(timeout);
    };
  }, [input, delayTime]);
  return delayValue;
}
