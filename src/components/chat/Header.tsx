import { MobileMunu } from "./MobileMenu";
import { ModelSelect } from "./ModelSelect";
import Sidebar from "./Sidebar";

export default function Header() {
  return (
    <header className="flex items-center p-2 sticky top-0 bg-white z-10">
      {/* 모바일 메뉴 영역 */}
      <MobileMunu>
        <Sidebar />
      </MobileMunu>

      {/* 모델 선택 영역 */}
      <ModelSelect />
    </header>
  );
}
