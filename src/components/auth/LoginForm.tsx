"use client";

import { Label } from "@radix-ui/react-label";
import { FormCard } from "./FormCard";
import { Input } from "../ui/input";
import { useFormState } from "react-dom";
import { useFormValidate } from "../../../hooks/useFormValidate";
import { TLoginFormError } from "../../../types/form";
import { ChangeEvent, useEffect } from "react";
import { login } from "../../../actions/login";
import { LoginSchema } from "../../../schemas/auth";
import toast from "react-hot-toast";
import FormMessage from "./FormMessage";
import { Submit } from "./Submit";

export default function LoginForm() {
  const [error, action] = useFormState(login, undefined);
  const { errors, validateField } =
    useFormValidate<TLoginFormError>(LoginSchema);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  useEffect(() => {
    if (error?.errorMessage) {
      toast.error(error.errorMessage);
    }
  }, [error]);

  return (
    <>
      <FormCard
        title="로그인"
        footer={{ label: "아직 계정이 없으신가요?", href: "/signup" }}
      >
        <form action={action} className="space-y-6">
          {/* 이메일 */}
          <div>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@example.com"
              error={!!errors?.email}
              onChange={handleChange}
            />
            {errors?.email && <FormMessage message={errors.email[0]} />}
          </div>
          {/* 비밀번호 */}
          <div>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              error={!!errors?.password}
              onChange={handleChange}
            />
            {errors?.password && <FormMessage message={errors.password[0]} />}
          </div>
          <Submit className="w-full">로그인</Submit>
        </form>
      </FormCard>
    </>
  );
}