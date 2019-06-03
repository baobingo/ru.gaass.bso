import rest from "rest";

export const login = (data) => rest({method: 'POST',
        path: '/login',
        entity: data.toString(),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });