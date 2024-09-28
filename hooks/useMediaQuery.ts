import { useEffect, useState } from "react";

export default function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const windowChangerHandler = () => setMatches(mediaQuery.matches);

    setMatches(mediaQuery.matches);

    mediaQuery.addEventListener("change", windowChangerHandler);

    return () => mediaQuery.removeEventListener("change", windowChangerHandler);
  }, [query]);

  return matches;
}
