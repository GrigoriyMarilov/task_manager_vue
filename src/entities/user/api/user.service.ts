import { signupDto } from "@/entities/user/dto/signup.dto.ts";
import { $api, ApiError } from "@/shared";
import { signinDto } from "@/entities/user/dto/signin.dto.ts";

import { User } from "@/entities/user/model/user.types.ts";

export class UserService {
  //Запрос для проверки существует ли пользователь с такой почтой. Почти всегда это должно происходить на бэке, но так как я использую mockapi.io то я буду проверять это на фронте
  static async checkEmail(email: string) {
    return $api.get("user", { params: { email: email } });
  }

  static async signup(data: signupDto) {
    //проверка существует ли пользователь с такой почтой
    try {
      const checkEmailResponse = await this.checkEmail(data.email);
      if (checkEmailResponse.data.length > 0) {
        //Имитирую ответ-ошибку для дальнейшей обработки
        throw new ApiError(409, "Не удалось зарегистрироваться", {
          email: "Пользователь с такой почтой уже существует",
        });
      }
    } catch (e) {
      return await $api.post<User>("user", data);
    }
  }

  static async signin(data: signinDto) {
    return await $api.get<User[]>("user", {
      params: data,
    });
  }
}
