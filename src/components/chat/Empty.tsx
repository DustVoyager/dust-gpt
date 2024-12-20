import Image from "next/image";

export function Empty() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-2">
      <Image src="/logo.png" width={50} height={50} alt="Empty" />
      <h3 className="text-xl md:text-2xl font-bold">무엇을 도와드릴까요?</h3>
    </div>
  );
}
