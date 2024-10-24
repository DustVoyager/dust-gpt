import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormCard } from "./FormCard";
import { Submit } from "./Submit";

export function SignUpForm() {
  return (
    <>
      <FormCard
        title="회원가입"
        footer={{ label: "이미 계정이 있으신가요?", href: "/login" }}
      >
        <form className="space-y-6">
          {/* 이름 */}
          <div className="space-y-1">
            <Label htmlFor="name">이름</Label>
            <Input id="name" placeholder="이름을 입력해주세요." />
          </div>
          {/* 이메일 */}
          <div>
            <Label htmlFor="email">이메일</Label>
            <Input id="email" type="email" placeholder="example@example.com" />
          </div>
          {/* 비밀번호 */}
          <div>
            <Label htmlFor="password">비밀번호</Label>
            <Input id="password" type="password" placeholder="********" />
          </div>
        </form>
        <Submit className="w-full">가입하기</Submit>
      </FormCard>
    </>
  );
}
