/* eslint-disable react/prop-types */
import { RoleStaffEnum } from '@/App/constants/userRoles';
import { useUpdateStaffMutation } from '@/App/providers/apis/staffListApi';
import { staffDataValidator } from '@/App/schemas/staffSchema';
import Button from '@/Core/components/common/Button';
import InputFieldControl from '@/Core/components/common/FormControl/InputFieldControl';
import SelectFieldControl from '@/Core/components/common/FormControl/SelectFieldControl';
import { LoadingSpinner } from '@/Core/components/common/Loading/LoadingSpinner';
import Modal from '@/Core/components/common/Modal';

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import tw from 'twin.macro';
const UpdateStaffModal = ({ userData, onOpenStateChange, openState }) => {
	const { handleSubmit, control, reset } = useForm({
		resolver: yupResolver(staffDataValidator),
		defaultValues: userData
	});

	useEffect(() => {
		if (userData) {
			reset({
				name: userData?.name,
				email: userData?.email,
				role: userData?.role
			});
		}
	}, [userData]);

	const [handleUpdateStaff, { isLoading }] = useUpdateStaffMutation();

	const onUpdateSubmit = async (data) => {
		const { error } = await handleUpdateStaff({ id: userData._id, payload: data });
		if (error) {
			toast.error('Sửa nhân viên không thành công!');
			return;
		}
		onOpenStateChange(!openState);
		toast.success('Sửa nhân viên thành công!');
	};

	return (
		<Modal openState={openState} onOpenStateChange={onOpenStateChange} title={'Sửa nhân viên'}>
			<Form onSubmit={handleSubmit(onUpdateSubmit)}>
				<InputFieldControl name='name' control={control} label='Tên nhân viên' />
				<InputFieldControl name='email' control={control} label='Email nhân viên' />
				<SelectFieldControl
					label='Quyền hạn nhân viên'
					control={control}
					name='role'
					options={Object.keys(RoleStaffEnum).map((role) => ({
						label: RoleStaffEnum[role],
						value: role.toString()
					}))}
				/>
				<Button type='submit' size='md' variant='primary' disabled={isLoading}>
					{isLoading && <LoadingSpinner size='sm' variant='primary' />}
					Cập nhật
				</Button>
			</Form>
		</Modal>
	);
};

const Form = tw.form`flex flex-col gap-6 min-w-[320px] max-w-full items-stretch`;

export default UpdateStaffModal;
