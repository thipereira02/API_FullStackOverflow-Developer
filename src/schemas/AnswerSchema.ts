import joi from 'joi';

export const answerSchema = joi.object({
	answer: joi.string().trim().required()
});