import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/users/dto/create-user.dto';
import { GetUserInput } from 'src/users/dto/get-user.dto';
import { UserWithoutPassword } from 'src/users/schemas/user.schema';

import { AuthService } from './auth.service';
import { GqlCtx } from './auth.types';
import { AccessTokenPayload } from './dto/access-token-payload.dto';
import { AuthResponse } from './dto/auth.response.dto';
import { JwtGqlAuthGuard } from './guards/jwt-gql-auth.guard';
import { LocalGqlAuthGuard } from './guards/local-gql-auth.guard';
import { RefreshJwtGqlAuthGuard } from './guards/refresh-jwt-gql-auth.guard';
import { stripPasswordFromUser } from './helpers/strip-password-from-user';

@Resolver('auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AccessTokenPayload)
  @UseGuards(RefreshJwtGqlAuthGuard)
  async refreshToken(@Context() context: GqlCtx): Promise<AccessTokenPayload> {
    return this.authService.refreshToken(context.req.user);
  }

  @Mutation(() => AuthResponse)
  async signup(@Args('newUserData') newUserData: CreateUserInput): Promise<AuthResponse> {
    return this.authService.signup(newUserData);
  }

  @Query(() => AuthResponse)
  @UseGuards(LocalGqlAuthGuard)
  async login(
    @Args('loginUserInput') _loginUserInput: GetUserInput,
    @Context() context: GqlCtx
  ): Promise<AuthResponse> {
    return this.authService.login(context.req.user);
  }

  @Query(() => UserWithoutPassword)
  @UseGuards(JwtGqlAuthGuard)
  async isAuthenticated(@Context() context: GqlCtx): Promise<UserWithoutPassword> {
    return stripPasswordFromUser(context.req.user);
  }
}
