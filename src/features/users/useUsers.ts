import { useEffect, useState } from "react";
import type { UserItem } from "../types";

export function useUsers() {
	const [ users, setUsers ] = useState<UserItem[]>([]);
	const [ loadUsers, setLoadUsers ] = useState(false);
	
	useEffect(() => {
		setLoadUsers(true);
		const fetchUsers = async () => {
			try {
				const res = await fetch("/api/users/get-users");
				
				if ( res.status === 401 ) {
					return;
				}
				if ( !res.ok ) throw new Error("Failed to fetch user");
				
				const json = await res.json();
				setUsers(json.data);
				setLoadUsers(false)
				
			} catch ( e ) {
				console.error("❌ fetch user:", e);
				
			} finally {
				setLoadUsers(false)
			}
		};
		
		fetchUsers();
	}, []);
	
	return { users, loadUsers };
}