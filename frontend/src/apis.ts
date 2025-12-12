export const API_BASE_URL = "https://assigment-teal-one.vercel.app/apis/";

export async function get(endpoint: string): Promise<any> {
    return await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}


export async function post(endpoint: string, body: any): Promise<any> {
    return await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
}

export async function put(endpoint: string, body: any): Promise<any> {
    return await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
}