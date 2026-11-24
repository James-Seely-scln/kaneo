import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Button, Size } from "@blueprintjs/core";

type ExternalLinkButtonProps = {
  href: string | null;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function ExternalLinkButton({
  href,
  size = "small",
  className,
  children,
}: ExternalLinkButtonProps) {
  const { t } = useTranslation();
  const content = (
    <>
      {children}
      <ExternalLink aria-hidden="true" className="size-3.5" />
      <span className="sr-only">
        {t("settings:workspaceImport.opensInNewTab")}
      </span>
    </>
  );

  if (!href) {
    return (
      <Button variant="outlined" size={size} className={className} disabled>
        {content}
      </Button>
    );
  }

  return (
    <Button
      variant="outlined"
      size={size}
      className={className}
    >
      {content}
    </Button>
  );
}
