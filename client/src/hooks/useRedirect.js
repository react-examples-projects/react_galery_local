import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function useRedirect(condition) {
  const { push } = useHistory();
  const [isCorrect, setCorrect] = useState(false);
  useEffect(() => {
    if (condition) return setCorrect(true);
    push("/not-found");
  }, [condition, push]);

  return isCorrect;
}
