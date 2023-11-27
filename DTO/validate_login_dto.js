import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';

const LoginDTOSchema = Type.Object(
  {
    email: Type.String({
      format: 'email',
      errorMessage: {
        type: 'El tipo de email debe ser un string',
        format: 'El email debe contener un correo válido',
      },
    }),
    password: Type.String({
      //Password no tiene formato
      errorMessage: {
        type: 'El tipo de password debe ser un string',
      },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: 'El formato del objeto noes válido',
    },
  },
);

//Validación
const ajv = new Ajv({ allErrors: true });
addFormats(ajv, ['email']);
addErrors(ajv);
const validate = ajv.compile(LoginDTOSchema);

const validateLoginDTO = (req, res, next) => {
  //Validate tiene mensajes de error
  const isDTOvalid = validate(req.body);

  /* if (!isDTOvalid) res.status(400).send('El body no es válido'); */
  if (!isDTOvalid)
    res.status(400).send(ajv.errorsText(validate.errors, { separator: '\n' }));

  next();
};

export default validateLoginDTO;
