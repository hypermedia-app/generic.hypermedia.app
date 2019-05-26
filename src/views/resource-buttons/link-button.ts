import ViewTemplates from '@lit-any/lit-any/views'
import fireNavigation from 'ld-navigation/fireNavigation'
import iconButton from './button-render'
import {IResourceButtonModel} from './index'
import {Scope} from './scope'

function followLink({ resource }: IResourceButtonModel) {
  return function(e: Event) {
    fireNavigation(this, resource.id)
    e.preventDefault()
    e.stopPropagation()
  }
}

ViewTemplates.default.when
  .scopeMatches(`${Scope}-link`)
  .valueMatches((v: IResourceButtonModel) => {
    const resourceIsAnonymous = v.resource && v.resource.isAnonymous

    if (v.predicate) {
      return v.predicate.isLink && !resourceIsAnonymous
    }

    return !resourceIsAnonymous
  })
  .renders(iconButton('link', followLink))

ViewTemplates.default.when
  .scopeMatches(`${Scope}-link`)
  .renders(() => '')
