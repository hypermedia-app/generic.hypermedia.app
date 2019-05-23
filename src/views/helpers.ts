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
