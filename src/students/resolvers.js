import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint, authEntryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;
const AuthURL = `http://${url}:${port}/${authEntryPoint}`;

const resolvers = {
	Query: {
		allStudents: (_) =>
			getRequest(URL, ''),
		studentByCode: (_, { code }) =>
			generalRequest(`${URL}/${code}`, 'GET'),
	},
	Mutation: {
		createStudent: (_, { student }) =>
			generalRequest(`${URL}`, 'POST', student),
		updateStudent: (_, { code, student }) =>
			generalRequest(`${URL}/${code}`, 'PUT', student),
		deleteStudent: (_, { code }) =>
			generalRequest(`${URL}/${code}`, 'DELETE'),
		authenticateStudent: (_, { student }) =>
			generalRequest(`${AuthURL}/`, 'POST', student)
	}
};

export default resolvers;
