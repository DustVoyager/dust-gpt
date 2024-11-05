"use server";

import bcrypt from "bcryptjs";
import { getUserByEmail } from "../data/user";
import { SignUpSchema } from "../schemas/auth";
import db from "../db";
import { user } from "../db/schema";

export const signUp = async (_: any, formData: FormData) => {
  // 1. validate Fields
  const validatedFields = SignUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errorMessage: "잘못된 입력값이 있습니다.",
    };
  }
  // 2. 존재하는 사용자인지 체크
  const { email, name, password } = validatedFields.data;

  // 4. 성공/실패처리
  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {
        errorMessage: "이미 존재하는 사용자 입니다.",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. insert db
    await db.insert(user).values({ name, email, password: hashedPassword });
    return {
      successMessage: "회원가입에 성공하였습니다. 로그인 페이지로 이동합니다.",
    };
  } catch (error) {
    console.log("error", error);
    return { errorMessage: "문제가 발생했습니다." };
  }
};
