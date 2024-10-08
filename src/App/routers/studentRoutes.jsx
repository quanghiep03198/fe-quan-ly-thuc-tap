import { StudentPaths } from '@/App/configs/routePaths';
import { lazy } from 'react';
import StudentPrivateLayout from '../layouts/PrivateLayout/StudentPrivateLayout';
const RecordPage = lazy(() => import('../pages/StudentPages/RecordPage'));
const RegistrationPage = lazy(() => import('../pages/StudentPages/RegistrationPage'));
const ReportPage = lazy(() => import('../pages/StudentPages/ReportPage'));
const StudentInfoPage = lazy(() => import('../pages/StudentPages/StudentInfoPage'));
const CompanyListPage = lazy(() => import('../pages/StudentPages/CompanyListPage'));

const studentRoutes = [
	{
		path: StudentPaths.STUDENT_INFO,
		element: (
			<StudentPrivateLayout>
				<StudentInfoPage />
			</StudentPrivateLayout>
		)
	},
	{
		path: StudentPaths.REGISTRATION,
		element: (
			<StudentPrivateLayout>
				<RegistrationPage />
			</StudentPrivateLayout>
		)
	},
	{
		path: StudentPaths.REPORT,
		element: (
			<StudentPrivateLayout>
				<ReportPage />
			</StudentPrivateLayout>
		)
	},
	{
		path: StudentPaths.RECORD,
		element: (
			<StudentPrivateLayout>
				<RecordPage />
			</StudentPrivateLayout>
		)
	},
	{
		path: StudentPaths.COMPANY_LIST,
		element: (
			<StudentPrivateLayout>
				<CompanyListPage />
			</StudentPrivateLayout>
		)
	}
];
export default studentRoutes;
