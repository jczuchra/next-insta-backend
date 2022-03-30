import { Joi } from "celebrate";
import { flow } from "fp-ts/lib/function";
import { environment, envNumber, envString, loadEnvs } from "./env";
import { AppConfig, ApplicationType } from "../interfaces/app";

loadEnvs();

const loadConfig = (): AppConfig => ({
  appName: envString('SERVER_NAME', "next_insta_api"),
  appType: ApplicationType.HTTP,
  port: envNumber('SERVER_PORT', 1337),
  env: environment(),
});

const validateConfig = (config: AppConfig): AppConfig | never => {
  const schema = Joi.object().keys({
    appName: Joi.string().required(),
    appType: Joi.string().valid("http").required(),
    port: Joi.number().required(),
    env: Joi.string().required(),
  });
  const { error, value } = schema.validate(config);

  if (error) {
    throw error;
  }

  return value;
};

export const appConfig = flow(loadConfig, validateConfig)();
