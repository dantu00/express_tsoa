export interface User {
  id: number;
  email: string;
  name: string;
  status: "Happy" | "Sad";
  phoneNumber: string[];
}
export type UserCreationParams = Pick<User, "email" | "name" | "phoneNumber">;
export class UserService {
  public get(id: number, name?: string): User {
    return {
      id,
      email: "jane@doe.com",
      name: name ?? "Jane Doe",
      status: "Happy",
      phoneNumber: [],
    };
  }

  public create(userCreationParams: UserCreationParams): User {
    return {
      id: Math.floor(Math.random() * 10000),
      status: "Happy",
      ...userCreationParams
    }
  }
}

import {
  Body, Controller, Get, Path, Post, Query, Route, SuccessResponse,
} from "tsoa";
@Route("users")
export class UsersController extends Controller {
  @Get("{userId}")
  public async getUser(
    @Path() userId: number,
    @Query() name?: string
  ): Promise<User> {
    return new UserService().get(userId, name);
  } 
  
  @SuccessResponse("201", "Created")
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<void> {
    this.setStatus(201); // set return status 201
    new UserService().create(requestBody);
    return;
  }
}