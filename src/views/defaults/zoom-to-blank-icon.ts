import { ViewTemplates } from '@lit-any/views'
import { IResource } from 'alcaeus/types/Resources/Resource'
import { html } from 'lit-html'
import { more } from '../helpers'

ViewTemplates.default.when
  .scopeMatches('default-resource-view')
  .valueMatches((v: IResource) => v && v.isAnonymous)
  .renders(() => '')
