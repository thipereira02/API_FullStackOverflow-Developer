import joi from 'joi';

export const questionSchema = joi.object({
	question: joi.string().trim().required(),
    student: joi.string().trim().required(),
	userClass: joi.string().max(2).pattern(/^[A-Z]{1}[0-9]{1}$/).required(),
    tags: joi.string().trim().required()
});