import client from "./apiClient";

const login = (data: any) => client.get({ url: "/data", data });

export { login };
