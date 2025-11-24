import React from 'react';
import style from './style.module.scss';
import { Button } from "@/components/UI";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useUser } from "@/features/user";
import { useUserStore } from "@/store";
import { NoResultsIcon } from "@/components/Icons";

export interface UserList {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	avatar_url: string | null;
	created_at: string;
	updated_at: string;
}

interface ModalUserProps {
	userInfo: UserList;
}

const ModalUser = ( { userInfo }: ModalUserProps ) => {
	const t = useTranslations();
	const { user } = useUser();
	const { setModalID } = useUserStore();
	
	const noUser = () => {
		return (<div className={ style.noUser }>
				<NoResultsIcon size={ 80 }/>
				<span>{ t("modals.user.notFound") }</span>
			</div>
		);
	}
	
	if ( !userInfo ) return noUser();
	const userProfile = user && user.id === userInfo.id;
	
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
						<Image src={ userInfo.avatar_url ? userInfo.avatar_url : '/images/no-photo.webp' } width={ 100 }
							   height={ 100 }
							   alt={ `${ userInfo.first_name } ${ userInfo.last_name }` }/>
					</div>
					<div className={ style.name }>{ userInfo.first_name } { userInfo.last_name }</div>
					<div className={ style.email }>{ userInfo.email }</div>
				</div>
				
				<div className={ style.userDetails }>
				
				</div>
			</div>
			<div className={ style.actions }>
				{
					userProfile && (
						<Button
							onClick={ handleLogout }
							variant="primary"
							className={ style.submit }
						>
							<span>{ t("uiText.logout") }</span>
						</Button>
					)
				}
			</div>
		</>
	);
};

export default ModalUser;