import { useEffect } from "react";

export function useKeyDown(
  key: KeyboardEvent["key"],
  fn: () => void,
  dependency: any[] = []
) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === key) {
        fn();
      }
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dependency]);
}
