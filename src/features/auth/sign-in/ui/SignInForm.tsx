'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

import {
  signInRequestSchema,
  type SignInRequestDto,
} from '@/features/auth/sign-in/schema';
import { nativeSignInAction } from '@/features/auth/sign-in/actions';
import { useAppConfigStore } from '@/shared/stores';
import { useAuthStore } from '@/entities/auth/stores/useAuthStore';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Checkbox } from '@/shared/ui/checkbox';
import { Button } from '@/shared/ui/button';

export default function SignInForm() {
  const router = useRouter();

  const [isLoading, setLoading] = useState<boolean>(false);

  const { isAutoSignIn, setAutoSignIn } = useAppConfigStore();
  const { signIn } = useAuthStore();

  const signInForm = useForm<SignInRequestDto>({
    resolver: zodResolver(signInRequestSchema),
    defaultValues: { userName: '', password: '', isAuto: isAutoSignIn },
  });

  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = signInForm;

  const handleFormChange = () => {
    if (errors.root) {
      clearErrors('root');
      clearErrors('userName');
      clearErrors('password');
    }
  };

  const onSubmit: SubmitHandler<SignInRequestDto> = async (req) => {
    setLoading(true);
    const response = await nativeSignInAction(req);

    if (response.code !== 'SU') {
      setLoading(false);

      switch (response.code) {
        case 'LGE':
        case 'VE':
          setError('root', {
            message: '아이디 또는 비밀번호가 올바르지 않습니다.',
          });
          break;

        default:
          setError('root', {
            message: '서버에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
          });
      }

      return;
    }

    const responseData = response.result;

    signIn(
      responseData.accessTokenExpiresAtMs,
      responseData.employeeCode,
      responseData.employeeName,
      responseData.accountRole,
      responseData.employeeRole,
      responseData.department,
      responseData.team,
      responseData.position,
    );

    router.replace('/');
  };

  return (
    <Form {...signInForm}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={handleFormChange}
        className="space-y-4"
      >
        <FormField
          control={control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="userName">아이디</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="userName"
                  placeholder="아이디"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">비밀번호</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  id="password"
                  placeholder="비밀번호"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="isAuto"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-1 space-y-0">
              <FormControl>
                <Checkbox
                  id="isAuto"
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    setAutoSignIn(checked as boolean);
                  }}
                  disabled={isLoading}
                />
              </FormControl>
              <FormLabel htmlFor="isAuto">자동로그인</FormLabel>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full gradient-primary text-primary-foreground"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            '로그인'
          )}
        </Button>
      </form>
    </Form>
  );
}
