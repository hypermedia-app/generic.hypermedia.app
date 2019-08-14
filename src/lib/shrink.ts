import { shrink as zazukoShrink, prefixes } from '@zazuko/rdf-vocabularies'

(prefixes as any).wikibus = 'https://wikibus.org/ontology#'

export function shrink(iri) {
  return (iri && zazukoShrink(iri)) || iri
}
