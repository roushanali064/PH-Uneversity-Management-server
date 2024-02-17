import z from 'zod';

const preRequisiteCourseSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    prefix: z.string(),
    code: z.number(),
    credit: z.number(),
    preRequisiteCourse: z.array(preRequisiteCourseSchema).optional(),
  }),
});

const updatePreRequisiteCourseSchema = z.object({
  course: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'title is required',
      })
      .optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credit: z.number().optional(),
    preRequisiteCourse: z.array(updatePreRequisiteCourseSchema).optional(),
  }),
});

const assignFacultiesWithCourseValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const courseValidationSchema = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  assignFacultiesWithCourseValidationSchema,
};
