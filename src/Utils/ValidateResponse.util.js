export const ValidateResponse = (res) => {
	if (!res.data.status) return { status: false, payload: res.data.error };
	return { status: true, payload: res.data.message };
};
