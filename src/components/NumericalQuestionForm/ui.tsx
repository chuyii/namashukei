import { useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Answer, NumericalQuestion } from '@/types';

import NumberInput from '../NumberInput';
import SubmitButton from '../SubmitButton';

export default function NumericalQuestionForm({
  className,
  request,
  onSubmit,
  answer,
}: {
  className?: string;
  request: NumericalQuestion;
  onSubmit?: (answer: number) => Promise<void>;
  answer?: Answer;
}) {
  const Schema = useMemo(() => {
    return z.object({
      answer: z
        .number({ invalid_type_error: '入力してください' })
        .min(
          request.min ?? -Infinity,
          `値が小さすぎます (最小値: ${request.min ?? '無限小'})`,
        )
        .max(
          request.max ?? Infinity,
          `値が大きすぎます (最大値: ${request.max ?? '無限大'})`,
        )
        .multipleOf(
          request.step,
          `値が細かすぎます (最小ステップ値: ${request.step})`,
        ),
    });
  }, [request.max, request.min, request.step]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.output<typeof Schema>>({
    resolver: zodResolver(Schema),
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: z.output<typeof Schema>) => {
      onSubmit && (await onSubmit(data.answer));
      reset();
    },
  });

  return (
    <div className={className}>
      {answer !== undefined && (
        <div className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-xl text-green-800">
          送信済み:{' '}
          <span className="font-bold">{`${answer}${
            request.unit ? ` ${request.unit}` : ''
          }`}</span>
        </div>
      )}
      <form onSubmit={handleSubmit((data) => mutate(data))} noValidate>
        <NumberInput
          className="mb-4 w-full"
          register={register('answer', { valueAsNumber: true })}
          unit={request.unit}
          disabled={isPending}
          isInvalid={!!errors.answer}
        />
        {errors.answer && (
          <p className="mb-4 text-red-500">{errors.answer.message}</p>
        )}
        <SubmitButton className="mb-4" isLoading={isPending}>
          送信
        </SubmitButton>
        {isError && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-red-800">
            送信が失敗しました
          </div>
        )}
      </form>
    </div>
  );
}
