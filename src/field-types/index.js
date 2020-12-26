import Number from './Number.svelte'
import Content from './Content.svelte'
import Switch from './Switch.svelte'
import URL from './URL.svelte'
import API from './API.svelte'

import Dropdown from './Dropdown.svelte'

export default [ 
  {
    id: 'content',
    label: 'Markdown',
    component: Content
  },
  {
    id: 'number',
    label: 'Number',
    component: Number
  },
  {
    id: 'switch',
    label: 'Switch',
    component: Switch
  },
  {
    id: 'url',
    label: 'URL',
    component: URL
  },
  {
    id: 'api',
    label: 'API',
    component: API
  },
  {
    id: 'dropdown',
    label: 'Dropdown',
    component: Dropdown,
  }
]