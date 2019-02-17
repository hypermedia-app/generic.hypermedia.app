export function Mixin(Base) {
  return class extends Base {
    get currentFilter() {
      return this['http://hydra-ex.rest/vocab/currentMappings']
    }
  }
}

export const shouldApply = (resource) => !!resource['http://hydra-ex.rest/vocab/currentMappings']
