import {HydraResource} from 'alcaeus/types/Resources'

export function typedResource(typeId) {
  return (v: HydraResource) => v.types && v.types.contains && v.types.contains(typeId)
}
