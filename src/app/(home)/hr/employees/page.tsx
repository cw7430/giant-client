import { redirect } from 'next/navigation';
import { Users } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { getEmployeeProfiles } from '@/entities/hr/employee/employee-list/model';
import { EmployeeProfilesRequestDto } from '@/entities/hr/employee/employee-list/schema';
import { EmployeeProfileTable } from '@/entities/hr/employee/employee-list/ui';

export default async function Employees() {
  const initParams: EmployeeProfilesRequestDto = {
    page: 1,
    size: 5,
    blockSize: 5,
    sortPath: 'employee',
    sortOrder: 'asc',
  };
  const response = await getEmployeeProfiles(initParams);

  if (response.code != 'SU') {
    redirect('/');
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="erp-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-success" />
            직원 목록
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmployeeProfileTable data={response.result} />
        </CardContent>
      </Card>
    </div>
  );
}
