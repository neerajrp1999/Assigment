export const API_BASE_URL = import.meta.env.VITE_API_URL;

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

export async function authGet(endpoint: string): Promise<any> {
    
    return await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`,
        },
    });
}


export async function authPost(endpoint: string, body: any): Promise<any> {
    const token = localStorage.getItem('token') || '';
    return await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
}


export async function authPostFile(endpoint: string, body: any): Promise<any> {
    const token = localStorage.getItem('token') || '';
    return await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        body, // ✅ raw FormData, not JSON
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
}


export async function authPut(endpoint: string, body: any): Promise<any> {
    const token = localStorage.getItem('token') || '';
    return await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
}

export async function authDelete(endpoint: string): Promise<any> {
    const token = localStorage.getItem('token') || '';
    return await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
}






