export async function fetchJson(url: string, options: {
    header?: Record<string, string>,
    [key: string]: any,
} = {}) {
   try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.header,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    }
    catch (error) {
        throw new Error(error as string);
    }
}
