import { Hydra } from 'alcaeus'
import * as FilteredCollectionHelper from './resource-mixins/FilteredCollectionHelper'

// @ts-ignore
Hydra.mediaTypeProcessors.RDF.resourceFactory.mixins.push(FilteredCollectionHelper)
