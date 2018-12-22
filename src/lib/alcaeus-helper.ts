function uniqBy(arr, predicate) {
  const cb = typeof predicate === 'function' ? predicate : (o) => o[predicate]

  return [...arr.reduce((map, item) => {
    const key = cb(item)

    if (!map.has(key)) {
      map.set(key, item)
    }

    return map
  }, new Map()).values()]
}

export function getProperties(resource) {
  const allProperties = resource.types
    .map((type) => resource.apiDocumentation.getProperties(type))
    .reduce((acc, val) => [...acc, ...val], [])

  return uniqBy(allProperties, (sp) => sp.property.id)
}
