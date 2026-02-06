"use client";

import React from 'react';
import { Button, Preloader } from "@/components/UI";
import style from "./header.module.scss";
import modal from "@/components/Modals/modal.module.scss";
import { useUser } from "@/features/user";
import { getInitials } from "@/utils";
import { useUserStore } from "@/store";
import { Modal, ModalUser } from "@/components/Modals";

const HeaderAccount = () => {
	const { user, isLoading } = useUser();
	const { setModalID } = useUserStore();
	
	return (
		<>
			<Button type="button"
					variant={ 'secondary' }
					onClick={ () => setModalID('modal-user') }
					className={ style.account }>
				{ isLoading && !user && <Preloader size={ "s" } overflow={ false }/> }
				<div className={ style.account_border }></div>
				{ user && <span>{ getInitials(`${ user.first_name } ${ user.last_name }`) }</span> }
			</Button>
			
			<Modal id={ "modal-user" }
				   className={ modal.modalUser }
				   animation={ "right" }>
				<ModalUser userInfo={ user }/>
			</Modal>
		</>
	);
};

export default HeaderAccount;