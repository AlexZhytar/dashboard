import Container from '@/components/UI/Container';
import style from './header.module.scss';
import { headerDefault } from '@/constants';
import HeaderMenu from './HeaderMenu';
import Link from 'next/link';
import HeaderAddProject from './HeaderAddProject';

const Header = () => {
    return (
        <header className={style.header}>
            <Container>
                <div className={style.header_wrapper}>
                    <Link href="/" className={style.header_logo}>
                        <img src="/icon/dashboard.svg" className={style.header_logo_img} alt="company logo" />
                    </Link>
                    <div className={style.header_nav}>
                        <HeaderMenu menu={headerDefault.menu} />
                    </div>
                    <div className={style.header_actions}>
                        <HeaderAddProject />
                    </div>
                </div>
            </Container>
        </header>
    );
}

export default Header;