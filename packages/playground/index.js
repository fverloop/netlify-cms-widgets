import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import cms from 'netlify-cms-app'
import { IdWidget } from '@ncwidgets/id'
import { ReorderWidget } from '@ncwidgets/reorder'
import { FileRelationWidget } from '@ncwidgets/file-relation'
import './test-data'

const h = React.createElement.bind(React)

const CMS = () => {
  useEffect(() => {
    cms.registerWidget({
      name: 'custom-id',
      controlComponent: IdWidget,
    })
    
    cms.registerWidget({
      name: 'custom-reorder',
      controlComponent: ReorderWidget,
    })

    cms.registerWidget({
      name: 'custom-file-relation',
      controlComponent: FileRelationWidget,
    })
    
    cms.init()
  });

  return h('div', { id: 'nc-root' })
};

const $root = document.createElement('div')
document.body.appendChild($root)
render(h(CMS), $root)
