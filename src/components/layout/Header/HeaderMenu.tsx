import NavLink from "@/components/UI/NavLink";
import style from './header.module.scss';

interface HeaderMenuProps {
	title: string;
	href: string;
}

type Props = {
	menu: HeaderMenuProps[];
}

const HeaderMenu = ( { menu }: Props ) => {
	return (
		<ul>
			{ menu.map(( item, index ) => (
				<li key={ index }>
					<NavLink href={ item.href } activeClassName={ style.active }>
						{ item.title }
					</NavLink>
				</li>
			)) }
		</ul>
	);
}

export default HeaderMenu;