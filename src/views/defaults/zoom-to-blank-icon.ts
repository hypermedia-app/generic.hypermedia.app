import { ViewTemplates } from '@lit-any/views'
import { IResource } from 'alcaeus/types/Resources/Resource'

ViewTemplates.default.when
  .scopeMatches('default-resource-view')
  .valueMatches((v: IResource) => v && v.isAnonymous)
  .renders(() => '')
