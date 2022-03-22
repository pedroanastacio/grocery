import IUser from '../interfaces/models/user';
import api from './api';
import authService from './auth';

class UserService {

	public create = async (user: IUser): Promise<void> => {
		await api.post('/user', user);
		return authService.login(user.email, user.password || '');
	};

	public getUser = async (userId: number): Promise<IUser> => {
		const { data: user } = await api.get(`/user/${userId}`);
		return user;
	};
}

const userService = new UserService();
export default userService;