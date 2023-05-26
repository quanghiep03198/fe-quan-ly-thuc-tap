import { useUpdateReviewMutation } from '@/App/providers/apis/studentApi';
import { reviewSchema } from '@/App/schemas/studentSchema';
import Button from '@/Core/components/common/Button';
import SelectFieldControl from '@/Core/components/common/FormControl/SelectFieldControl';
import TextareaFieldControl from '@/Core/components/common/FormControl/TextareaFieldControl';
import Modal from '@/Core/components/common/Modal';
import { StaffPaths } from '@/Core/constants/routePaths';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateReviewModal = ({
	openState,
	onOpenStateChange: handleOpenStateChange,
	selectedStudents,
	statusOptions
}) => {
	const [updateStatus, { isLoading, isSuccess }] = useUpdateReviewMutation();
	const { email: reviewerEmail } = useSelector((state) => state.auth?.user);
	const { control, handleSubmit } = useForm({
		resolver: yupResolver(reviewSchema)
	});
	const navigate = useNavigate();

	const handleReview = async (data) => {
		try {
			if (!selectedStudents.length) {
				toast.error('Chưa có sinh viên nào được chọn !');
				return;
			}

			const listIdStudent = selectedStudents.map((student) => student._id);
			const listEmailStudent = selectedStudents.map((student) => student.email);

			data = {
				...data,
				listIdStudent,
				listEmailStudent,
				reviewerEmail
			};

			const { error } = updateStatus(data);
			if (error) {
				toast.error('Đã xảy ra lỗi !');
				handleOpenStateChange(!openState);
				return;
			}
			handleOpenStateChange(!openState);
			toast.success('Xác nhận review CV thành công !');
			navigate(StaffPaths.STUDENT_LIST);
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<Modal openState={openState} onOpenStateChange={handleOpenStateChange} title='Cập nhật trạng thái sinh viên'>
			<Modal.Form onSubmit={handleSubmit(handleReview)}>
				<SelectFieldControl control={control} name='status' options={statusOptions} label='Trạng thái' />
				<TextareaFieldControl
					control={control}
					name='textNote'
					resizable={false}
					rows={3}
					label='Ghi chú'
					placeholder='Ghi chú cho sinh viên ...'
				/>
				<Button type='submit' variant='primary' size='md' disabled={isLoading}>
					Review CV
				</Button>
			</Modal.Form>
		</Modal>
	);
};

Modal.Form = ({ ...props }) => (
	<form {...props} className='flex w-[320px] flex-col items-stretch gap-6'>
		{props.children}
	</form>
);
Modal.Actions = ({ ...props }) => (
	<div {...props} className='flex items-center justify-end gap-1'>
		{props.children}
	</div>
);

export default UpdateReviewModal;
