import { useSettingsStore, useToggleMultiTab } from "@/store/settingsStore";
import { Col, Form, Row, Switch } from "@douyinfe/semi-ui";
import Section from "@douyinfe/semi-ui/lib/es/form/section";
import Title from "@douyinfe/semi-ui/lib/es/typography/title";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Setting() {
  const { t } = useTranslation();
  const settingStore = useSettingsStore();
  const [multiTab, setMultiTab] = useState(settingStore.settings.isUseMultitab ?? true);
  const toggleMultiTab = useToggleMultiTab();
  useEffect(()=>{
    toggleMultiTab(multiTab);
  },[multiTab, toggleMultiTab])
  return (
    <>
      <Form
        style={{ padding: 10, width: "100%" }}
        onValueChange={(v) => console.log(v)}
      >
        <Section text={t("sys.other.apperance")}>
          <Row>
            <Col span={12}>
              <Title heading={6} style={{ margin: 8 }}>{t('sys.setting.ifUseMultiTab')}</Title>
              <Switch checked={multiTab} onChange={(multiTab)=>setMultiTab(multiTab)}/>
            </Col>
          </Row>
        </Section>
      </Form>
    </>
  );
}
