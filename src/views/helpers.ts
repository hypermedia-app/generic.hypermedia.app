export function more(resource, parent) {
  return (e) => {
    e.target.dispatchEvent(new CustomEvent('hydrofoil-append-resource', {
      bubbles: true,
      composed: true,
      detail: {
        parent,
        resource,
      },
    }))
  }
}

export function getPath(urlStr: string) {
  const url = new URL(urlStr)
  return url.pathname + url.search
}
