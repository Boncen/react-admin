import { IllustrationFailure, IllustrationFailureDark } from "@douyinfe/semi-illustrations";
import { Button, Empty } from "@douyinfe/semi-ui";
import { useTranslation } from "react-i18next";
import { useNavigate, useRouteError } from "react-router-dom"

export function Page500() {
    const error: any = useRouteError();
    const navigate = useNavigate();
    const {t} = useTranslation();
    return (
         <div className="flex flex-col justify-center items-center w-full h-full mt-10">
         <Empty
           image={<IllustrationFailure style={{ width: 150, height: 150 }} />}
           darkModeImage={
             <IllustrationFailureDark style={{ width: 150, height: 150 }} />
           }
       
         >
           <div>
            <div className="text-red-600 mb-8">error: {error.message}</div>
             <Button
               style={{ padding: "6px 24px", marginRight: 12 }}
               type="primary"
               onClick={() => navigate(-1)}
             >
               {t('ui.back')}
             </Button>
             {/* <Button
               style={{ padding: "6px 24px" }}
               theme="solid"
               type="primary"
               onClick={() => navigate("/")}
             >
               {t('ui.backToHome')}
             </Button> */}
           </div>
         </Empty>
       </div>
    )
}