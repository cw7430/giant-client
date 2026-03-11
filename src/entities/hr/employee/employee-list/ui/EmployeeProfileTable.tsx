'use client';

import { EmployeeProfilesResponseDto } from '@/entities/hr/employee/employee-list/schema';

interface Props {
  data: EmployeeProfilesResponseDto;
}

export default function EmployeeProfileTable(props: Props) {
  return (
    <div>
      <div>{JSON.stringify(props.data)}</div>
    </div>
  );
}
