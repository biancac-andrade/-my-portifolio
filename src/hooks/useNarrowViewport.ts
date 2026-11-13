import { useEffect, useState } from 'react'

export function useNarrowViewport(maxWidthPx = 720) {
  const query = `(max-width: ${maxWidthPx}px)`
  const [narrow, setNarrow] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(query).matches
      : false,
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const sync = () => setNarrow(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [query])

  return narrow
}
