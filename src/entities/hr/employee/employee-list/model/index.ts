import type { ApiSuccessDtoWithResult } from '@/shared/apis/schema';
import type {
  EmployeeProfilesRequestDto,
  EmployeeProfilesResponseDto,
} from '@/entities/hr/employee/employee-list/schema';
import { apiGet } from '@/shared/apis/configs/fetch-request';
import { ApiError, clientResponseWithResult } from '@/shared/apis/configs';

export const getEmployeeProfiles = async (param: EmployeeProfilesRequestDto) =>
  clientResponseWithResult(async () => {
    const response = await apiGet<
      ApiSuccessDtoWithResult<EmployeeProfilesResponseDto>
    >('/auth/refresh', param, { authType: 'access' });

    if (!response?.result) {
      throw new ApiError('ISE', '서버에서 응답이 없습니다.');
    }

    return response.result;
  });
