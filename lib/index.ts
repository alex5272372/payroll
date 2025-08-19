import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { ToolbarItem } from '@/types'
import { CRUD } from '@/lib/data/roleMatrix'

export const catalogToolbar: ToolbarItem[] = [
  { name: 'New', icon: PlusIcon, onClick: () => {}, permission: CRUD.CREATE },
  { name: 'Edit', icon: PencilIcon, onClick: () => {}, permission: CRUD.UPDATE },
  { name: 'Delete', icon: TrashIcon, onClick: () => {}, permission: CRUD.DELETE },
]
