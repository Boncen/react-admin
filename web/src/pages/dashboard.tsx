import { useTranslation } from "react-i18next";


export default function Dashboard(){
    const { t } = useTranslation();
    return (
        <div>home dashboard {t('header.myinfo')}</div>
    )
}