import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { ToolbarItem } from '@/types'

export const catalogToolbar: ToolbarItem[] = [
  { name: 'New', icon: PlusIcon, onClick: () => {} },
  { name: 'Edit', icon: PencilIcon, onClick: () => {} },
  { name: 'Delete', icon: TrashIcon, onClick: () => {} },
]
