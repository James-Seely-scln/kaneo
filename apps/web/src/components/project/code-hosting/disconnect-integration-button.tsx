import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ConfirmDialog } from "@/components/settings/confirm-dialog";
import { Button } from "@blueprintjs/core";

type DisconnectIntegrationButtonProps = {
  provider: string;
  target: string;
  pending: boolean;
  onConfirm: () => Promise<boolean>;
};

export function DisconnectIntegrationButton({
  provider,
  target,
  pending,
  onConfirm,
}: DisconnectIntegrationButtonProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="outlined"
        intent="danger"
        size="small"
        disabled={pending}
        onClick={() => setOpen(true)}
      >
        {t("settings:codeHosting.disconnect")}
      </Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={t("settings:codeHosting.disconnectTitle", { provider })}
        description={t("settings:codeHosting.disconnectDescription", {
          target,
        })}
        confirmLabel={t("settings:codeHosting.disconnect")}
        pendingLabel={t("settings:codeHosting.disconnecting")}
        pending={pending}
        onConfirm={async () => {
          if (await onConfirm()) setOpen(false);
        }}
      />
    </>
  );
}
