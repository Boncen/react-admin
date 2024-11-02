import { Button, Empty } from "@douyinfe/semi-ui";
import {
  IllustrationNotFound,
  IllustrationNotFoundDark,
} from "@douyinfe/semi-illustrations";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { CloseTabContext } from "@/layout/multitabs/closeTabContext";
import { UseRouter } from "@/hooks/useRouter";

export function Page404() {
  // const navigate = useNavigate();
  const { push, jump } = UseRouter();
  const { t } = useTranslation();
  const context = useContext(CloseTabContext);
  return (
    <div className="flex flex-col justify-center items-center w-full h-full mt-10">
      <Empty
        image={<IllustrationNotFound style={{ width: 150, height: 150 }} />}
        darkModeImage={
          <IllustrationNotFoundDark style={{ width: 150, height: 150 }} />
        }
        description={t("ui.pageNotFound")}
      >
        <div>
          <Button
            style={{ padding: "6px 24px", marginRight: 12 }}
            type="primary"
            onClick={() => {
              jump(-1);
              if (context?.closeCurrentTab) {
                context.closeCurrentTab();
              }
            }}
          >
            {t("ui.back")}
          </Button>
          <Button
            style={{ padding: "6px 24px" }}
            theme="solid"
            type="primary"
            onClick={() => {
              if (context?.closeCurrentTab) {
                context.closeCurrentTab();
              }
              push("home");
            }}
          >
            {t("ui.backToHome")}
          </Button>
        </div>
      </Empty>
    </div>
  );
}
