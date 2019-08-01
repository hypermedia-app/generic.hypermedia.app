import { shrink as zazukoShrink } from '@zazuko/rdf-vocabularies'

export function shrink(iri) {
  return (iri && zazukoShrink(iri)) || iri
}
