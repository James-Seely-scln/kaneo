import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { AuthPage } from "@/components/auth/auth-page";
import { Button } from "@blueprintjs/core";

export function OnboardingRestricted() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <AuthPage
      title={t("auth:onboarding.restrictedTitle")}
      description={t("auth:onboarding.restrictedSubtitle")}
    >
      <Button
        size="large"
        variant="outlined"
        className="w-full"
        onClick={() => navigate({ to: "/invitations" })}
      >
        {t("auth:onboarding.restrictedCheckInvitations")}
      </Button>
    </AuthPage>
  );
}
