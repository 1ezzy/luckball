// import { drizzle } from 'drizzle-orm/postgres-js';
// import postgres from 'postgres';

// export const createDrizzleClient = (env: any) => {
//     // Skip Drizzle client creation if SKIP_DRIZZLE is set
//     if (process.env.SKIP_DRIZZLE === 'true') {
//         return null;
//     }

//     const client = postgres(env.HYPERDRIVE.connectionString);
//     return drizzle(client);
// };
