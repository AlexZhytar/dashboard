// Базовий URL для всіх webhook-ендпоінтів дашборду (n8n)
export const API_BASE_URL = "https://n8n.testsofts.com/webhook/dashboard";

// Хелпер для формування повного URL з версією API (/v1)
const getUrl = ( path: string ): string => {
	return `${ API_BASE_URL }/v1${ path }`;
};

export const api = {
	
	// ===== Auth / User =====
	
	// Авторизація користувача
	// Викликається для логіну (отримання токена / сесії)
	login: (): string => getUrl("/ws/auth/login"),
	
	
	// ===== User profile =====
	
	// Отримання профілю поточного авторизованого користувача
	// Повертає дані юзера: id, імʼя, email, ролі тощо
	getProfile: (): string => getUrl("/ws/profile"),
	
	
	// ===== Projects =====
	
	// Отримання списку всіх проектів користувача
	// Використовується для головного списку / дашборду
	getProjects: (): string => {
		return getUrl("/ws/projects");
	},
	
	
	// ===== Project mutations =====
	
	// Створення нового проекту
	// Дані проекту передаються в body (POST)
	createProject: (): string => {
		return getUrl("/ws/projects/create");
	},
	
	// Оновлення існуючого проекту
	// project_id передається через query-параметр
	updateProject: ( projectId: string ): string => {
		return getUrl(`/ws/projects/update?project_id=${ encodeURIComponent(projectId) }`);
	},
	
	// Видалення проекту
	// project_id передається через query-параметр
	deleteProject: ( projectId: string ): string => {
		return getUrl(`/ws/projects/delete?project_id=${ encodeURIComponent(projectId) }`);
	},
	
	
	// ===== Users =====
	
	// Отримання списку всіх користувачів (глобально)
	getUsers: (): string => getUrl("/ws/users"),
	
	// Отримання користувачів з фільтрацією по пошуковому запиту
	// search — рядок для пошуку (email / імʼя тощо)
	getFilteredUsers: ( search: string ): string => {
		return getUrl(`/api/users?search=${ encodeURIComponent(search) }`);
	}
};
