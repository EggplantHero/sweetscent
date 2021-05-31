import Joi from "joi-browser";

export const initialState = {
  name: "",
  ivs: {
    hp: { value: 31, active: true },
    atk: { value: 31, active: true },
    def: { value: 31, active: true },
    spa: { value: 31, active: true },
    spd: { value: 31, active: true },
    spe: { value: 31, active: true },
  },
  nature: { value: "adamant", active: true },
  eggGroups: [],
  gender: "",
  possibleGenders: [],
  breeder: true,
};

export const schema = {
  name: Joi.string().required(),
  ivs: Joi.object({
    hp: Joi.object({
      value: Joi.number().integer().min(0).max(31),
      active: Joi.boolean(),
    }),
    atk: Joi.object({
      value: Joi.number().integer().min(0).max(31),
      active: Joi.boolean(),
    }),
    def: Joi.object({
      value: Joi.number().integer().min(0).max(31),
      active: Joi.boolean(),
    }),
    spa: Joi.object({
      value: Joi.number().integer().min(0).max(31),
      active: Joi.boolean(),
    }),
    spd: Joi.object({
      value: Joi.number().integer().min(0).max(31),
      active: Joi.boolean(),
    }),
    spe: Joi.object({
      value: Joi.number().integer().min(0).max(31),
      active: Joi.boolean(),
    }),
  }),
  nature: Joi.object({
    value: Joi.string().required(),
    active: Joi.boolean(),
  }),
  eggGroups: Joi.array().items(Joi.string()).max(2),
  gender: Joi.string().required(),
  possibleGenders: Joi.array().items(Joi.string()).max(3),
  breeder: Joi.boolean().valid(true),
};

export const validate = (state, schema) => {
  const result = Joi.validate(state, schema, { abortEarly: false });

  if (!result.error) return true;
  return false;
};
