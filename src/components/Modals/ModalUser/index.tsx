import React from 'react';
import style from './style.module.scss';
import { Button } from "@/components/UI";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useUser } from "@/features/user";
import { useUserStore } from "@/store";

const ModalUser = () => {
	const t = useTranslations();
	const { user } = useUser();
	const { setModalID } = useUserStore();
	
	const handleLogout = async () => {
		setModalID(null);
		await fetch('/api/user/logout', { method: 'POST' });
		window.location.reload();
	};
	
	return (
		<>
			<div className={ style.userContent }>
				<div className={ style.userInfo }>
					<div className={ style.background }>
						<Image src="/images/bg-profile.jpg" alt="Background" fill/>
					</div>
					<div className={ style.avatar }>
						<Image src={ user.avatar_url ? user.avatar_url : '/images/no-photo.webp' } width={ 100 }
							   height={ 100 }
							   alt={ `${ user.first_name } ${ user.last_name }` }/>
					</div>
					<div className={ style.name }>{ user.first_name } { user.last_name }</div>
					<div className={ style.email }>{ user.email }</div>
				</div>
				
				<div className={ style.userDetails }>
				
				</div>
			</div>
			<div className={ style.actions }>
				<Button
					onClick={ handleLogout }
					variant="primary"
					className={ style.submit }
				>
					<span>{ t("uiText.logout") }</span>
				</Button>
			</div>
		</>
	);
};

export default ModalUser;