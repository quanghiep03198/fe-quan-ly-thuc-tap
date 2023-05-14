import { object, string, array, number } from "yup";

export const staffDataValidator = 
	object({
		name: string().required("Tên nhân viên là bắt buộc"),
		email: string().email().required("Email là bắt buộc"),
		role: number().required("Quyền hạn là bắt buộc"),
	});