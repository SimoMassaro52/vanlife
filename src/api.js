//This file contains the fetching async functions to simulate an API call since we will never pull the data directely from the server in production as we were doing before

export async function getVans(id) {
	const url = id ? `/api/vans/${id}` : "/api/vans";
	const res = await fetch(url);
	if (!res.ok) {
		throw {
			message: "Failed to fetch vans",
			statusText: res.statusText,
			status: res.status,
		};
	}
	const data = await res.json();
	return data.vans;
}

export async function getHostVans(id) {
	const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
	const res = await fetch(url);
	if (!res.ok) {
		throw {
			message: "Failed to fetch vans",
			statusText: res.statusText,
			status: res.status,
		};
	}
	const data = await res.json();
	return data.vans;
}