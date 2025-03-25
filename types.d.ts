type AlignMenuItem = 'left' | 'right'

export type HeroIcon = React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>
  & { title?: string, titleId?: string } & React.RefAttributes<SVGSVGElement>>

export type MenuItem = {
  id: string;
  name: string;
  icon: HeroIcon;
  align?: AlignMenuItem;
  auth?: boolean;
  items?: MenuItem[];
}

export type TabItem = {
  id: string;
  name: string;
  active?: boolean;
}
