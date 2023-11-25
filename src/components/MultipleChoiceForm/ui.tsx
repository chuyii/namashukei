import { useId, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Answer, MultipleChoice } from '@/types';

import SubmitButton from '../SubmitButton';

export default function MultipleChoiceForm({
  className,
  request,
  onSubmit,
  answer,
}: {
  className?: string;
  request: MultipleChoice;
  onSubmit?: (answer: number) => Promise<void>;
  answer?: Answer;
}) {
  const id = useId();
  const Schema = useMemo(() => {
    return z.object({
      answer: z.preprocess(
        (v) => (v ? Number(v) : v),
        z
          .number({ invalid_type_error: '選択してください' })
          .int()
          .min(0)
          .max(request.choices.length - 1),
      ),
    });
  }, [request.choices.length]);
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
      <form onSubmit={handleSubmit((data) => mutate(data))} noValidate>
        <ul>
          {request.choices.map((choice, index) => (
            <li className="relative" key={index}>
              <input
                id={id + '-' + index}
                className="peer hidden"
                type="radio"
                {...register('answer')}
                value={index}
                disabled={isPending}
              />
              <label
                htmlFor={id + '-' + index}
                className="mb-4 block w-full cursor-pointer rounded-lg border border-gray-400 px-4 py-4 text-center text-xl outline outline-[3px] outline-offset-[-3px] outline-transparent hover:bg-gray-50 active:bg-gray-100 peer-checked:outline-emerald-400 peer-disabled:cursor-auto peer-disabled:border-gray-200 peer-disabled:bg-gray-50 peer-checked:peer-disabled:outline-gray-300"
              >
                {choice}
              </label>
              {answer === index && (
                <span className="absolute left-1 top-1 rounded-full bg-green-100 px-2.5 text-xs font-medium text-green-800 peer-disabled:bg-gray-200 peer-disabled:text-gray-800">
                  送信済み
                </span>
              )}
            </li>
          ))}
        </ul>
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
