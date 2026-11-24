import { CircleAlertIcon, RefreshCwIcon } from "lucide-react";
import { SettingsRow } from "@/components/settings/settings-row";
import { Button } from "@blueprintjs/core";

type DirectoryErrorRowProps = {
  message: string;
  retryLabel: string;
  onRetry: () => void;
};

export function DirectoryErrorRow({
  message,
  retryLabel,
  onRetry,
}: DirectoryErrorRowProps) {
  return (
    <SettingsRow icon={<CircleAlertIcon />} title={message}>
      <Button type="button" variant="outlined" size="small" onClick={onRetry}>
        <RefreshCwIcon aria-hidden="true" />
        {retryLabel}
      </Button>
    </SettingsRow>
  );
}
