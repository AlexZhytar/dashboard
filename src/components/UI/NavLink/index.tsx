'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LinkProps } from './types';

const NavLink: React.FC<LinkProps> = ({
    href,
    children,
    className = '',
    activeClassName = 'active',

}) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`${className} ${isActive ? activeClassName : ''}`.trim()}
        >
            {children}
        </Link>
    );
}

export default NavLink;
