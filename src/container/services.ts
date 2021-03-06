import { asClass, type AwilixContainer } from 'awilix';
import type { AuthenticationClientFactory } from '../factories/authentication/authentication-client.factory';
import type { AppConfig } from '../interfaces/app';
import { type ServiceDependencies, UserService, SecurityService, ActivationTokenService, TokenService } from '../services';

export async function registerServices(
  container: AwilixContainer,
  appConfig: AppConfig,
): Promise<AwilixContainer<ServiceDependencies>> {
  const authenticationFactory: AuthenticationClientFactory = container.resolve('authenticationFactory');
  const AuthenticationClient = authenticationFactory.getAuthenticationClient(appConfig.authenticationStrategy);

  container.register({
    securityService: asClass(SecurityService).singleton(),
    tokenService: asClass(TokenService).singleton(),
    activationTokenService: asClass(ActivationTokenService).singleton(),
    userService: asClass(UserService).singleton(),
    authService: asClass(AuthenticationClient).singleton(),
  });

  return container;
}
