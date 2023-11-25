import { z } from 'zod';

import type { serverTimestamp } from 'firebase/database';

/**
 * NumericalQuestion
 * 数値での回答に関する情報
 */

export const NumericalQuestion = z.object({
  type: z.literal('N'),
  min: z.number().optional(),
  max: z.number().optional(),
  step: z.number(),
  unit: z
    .string()
    .trim()
    .refine((val) => new TextEncoder().encode(val).length < 32, {
      message: '文字数が多すぎます',
    })
    .optional(),
});
// eslint-disable-next-line no-redeclare
export type NumericalQuestion = z.infer<typeof NumericalQuestion>;

/**
 * MultipleChoice
 * 選択肢での回答に関する情報
 */

export const MultipleChoice = z.object({
  type: z.literal('M'),
  choices: z
    .array(
      z.string().refine((val) => new TextEncoder().encode(val).length < 32, {
        message: '文字数が多すぎます',
      }),
    )
    .min(1)
    .max(4),
});
// eslint-disable-next-line no-redeclare
export type MultipleChoice = z.infer<typeof MultipleChoice>;

/**
 * Countdown
 * 回答受付終了時間に関する情報
 */

export const CountdownPath = '/request/countdown';

const ServerTimestampSchema = z.custom<ReturnType<typeof serverTimestamp>>();

const CountdownBase = z.object({
  seconds: z.number().int().positive(),
});

export const Countdown = CountdownBase.merge(
  z.object({
    startAt: ServerTimestampSchema,
  }),
);
export type ToCountdown = z.infer<typeof Countdown>;

export const FromCountdown = CountdownBase.merge(
  z.object({
    startAt: z.number(),
  }),
);
// eslint-disable-next-line no-redeclare
export type FromCountdown = z.infer<typeof FromCountdown>;

// eslint-disable-next-line no-redeclare
export type Countdown = ToCountdown | FromCountdown;

/**
 * Request
 * 質問事項と回答受付終了時間に関する情報を合わせたもの
 */

export const RequestPath = '/request';

export const RequestContent = z.discriminatedUnion('type', [
  NumericalQuestion,
  MultipleChoice,
]);
// eslint-disable-next-line no-redeclare
export type RequestContent = z.infer<typeof RequestContent>;

export const Request = z.object({
  countdown: Countdown,
  content: RequestContent,
});
export type ToRequest = z.infer<typeof Request>;

export const FromRequest = z.object({
  countdown: FromCountdown,
  content: RequestContent,
});
// eslint-disable-next-line no-redeclare
export type FromRequest = z.infer<typeof FromRequest>;

// eslint-disable-next-line no-redeclare
export type Request = ToRequest | FromRequest;

/**
 * Answer
 * 回答内容に関する情報
 */

export const AnswerPath = (userId?: string) => `/answers/${userId || ''}`;

export const Answer = z.number();
// eslint-disable-next-line no-redeclare
export type Answer = z.infer<typeof Answer>;

/**
 * Notice
 * 通知に関する情報
 */

export const NoticePath = (userId?: string) => `/notices/${userId || ''}`;

export const Notice = z.string();
// eslint-disable-next-line no-redeclare
export type Notice = z.infer<typeof Notice>;
