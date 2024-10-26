import { IconBell } from "@douyinfe/semi-icons";
import { Button } from "@douyinfe/semi-ui";

export function Notification() {
  return (
    <Button
      theme="borderless"
      icon={<IconBell size="large" />}
      style={{
        color: "var(--semi-color-text-2)",
        marginRight: "12px",
      }}
    />
  );
}
