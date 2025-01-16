import Icons from "@/assets/icons/Icons";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { MailIcon } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex flex-col sm:flex-row gap-8 min-h-48 px-4 sm:px-16 py-8 border-t">
      <div className="flex flex-col items-center sm:items-start gap-4">
        <Image alt="logo-image" src="/open-franchise-logo-v-gray.png" width={120} height={30} />
        <p className="whitespace-pre text-wrap text-caption1 sm:text-body text-center sm:text-start text-neutral-300">
          공정거래위원회의 가맹사업 정보공개서를 기반으로 창업 전,{"\n"}프랜차이즈 본사 정보, 브랜드의 매출, 가맹점 수,
          인테리어 금액, 창업 비용 정보를 편리하게 확인할 수 있습니다.{" "}
        </p>
        <p className="whitespace-pre text-wrap text-caption1 sm:text-body text-center sm:text-start text-neutral-300">
          불편하신 사항이나 추가적인 기능을 원하신다면 아래 메일로 연락 바랍니다.
        </p>
        <div className="text-center sm:text-start">
          <p className="text-body text-neutral-300">[CONTACT]</p>
          <div className="flex gap-1 items-center">
            <MailIcon color="#d4d4d4" width={18} height={18} />
            <p className="text-body text-neutral-300">devlasbe@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 justify-center sm:justify-end gap-4">
        <a
          className="cursor-pointer hover:opacity-50"
          href="https://devlasbe.notion.site/Frontend-Developer-964a96a4b5474977bd25cb8621050c4e?pvs=4"
          target="_blank"
        >
          <Icons.Portfolio fill="#a3a3a3" width={20} height={20} />
        </a>
        <a className="cursor-pointer hover:opacity-50" href="https://lasbe.tistory.com/" target="_blank">
          <Icons.Blog fill="#a3a3a3" width={20} height={20} />
        </a>
        <a className="cursor-pointer hover:opacity-50" href="https://github.com/devlasbe" target="_blank">
          <GitHubLogoIcon color="#A3A3A3" width={20} height={20} />
        </a>
      </div>
    </footer>
  );
}
