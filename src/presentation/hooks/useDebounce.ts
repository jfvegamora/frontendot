import React from "react";
import _ from "lodash";

export function useDebouce(value: any, delay: any) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = _.debounce(() => {
      setDebouncedValue(value);
    }, delay);
    handler();
    return () => {
      handler.cancel();
    };
  }, [value, delay]);

  return debouncedValue;
}
