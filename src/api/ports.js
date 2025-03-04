import config from "../api/config";  

export const fetchPorts = async () => {
    try {
        const response = await fetch(`${config.apiUrl}/api/ports`);
        const data = await response.json();
        return {
            to: Array.isArray(data.to) ? data.to : [],
            from: Array.isArray(data.from) ? data.from : []
        };
    } catch (error) {
        console.error('Error fetching ports:', error);
        return { to: [], from: [] };
    }
};
