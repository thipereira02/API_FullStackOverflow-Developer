import joi from 'joi';

export const userSchema = joi.object({
	name: joi.string().trim().required(),
	userClass: joi.string().max(2).pattern(/^[A-Z]{1}[1-9]{1}$/).required()
});
