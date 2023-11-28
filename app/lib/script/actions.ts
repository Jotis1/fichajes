const user = 'desarrollo';
const password = 'N00l1va.2024**';
const base64Credentials = btoa(`${user}:${password}`);

export default async function fetchData({ id, type, date, latitude, longitude }: { id: number, type: "Entrada" | "Salida", date: { hour: string, day: string }, latitude: string, longitude: string }) {

    const data = {
        "id": id,
        "fecha": date.day,
        "hora": date.hour,
        "estado": type.toLowerCase(),
        "latitud": latitude,
        "longitud": longitude
    }

    try {
        const response = await fetch("https://fichajes.appsbecallgroup.com/api/fichajes", {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${base64Credentials}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        const responseData = await response.json();
        return responseData;
    } catch (err) {
        throw err;
    }
}
