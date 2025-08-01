import { GRID_API_KEY, GRID_ENDPOINT } from '$env/static/private';
import { GraphQLClient } from 'graphql-request';

export const graphQLClient = new GraphQLClient(GRID_ENDPOINT, {
	headers: {
		'X-API-Key': GRID_API_KEY
	}
});

export const callGraphQLQuery = async (graphQLClient: GraphQLClient, document: string) => {
	try {
		return await graphQLClient.request(document);
	} catch (error) {
		return error;
	}
};
