import { ArrowRight, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@blueprintjs/core";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type BacklogToolbarActionsProps = {
  onPlan: () => void;
  onMoveAll: () => void;
};

export function BacklogToolbarActions({
  onPlan,
  onMoveAll,
}: BacklogToolbarActionsProps) {
  const { t } = useTranslation();
  const planLabel = t("tasks:backlog.plan");
  const moveAllLabel = t("tasks:backlog.moveAllTooltip");

  return (
    <>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="minimal"
              size="small"
              aria-label={planLabel}
              onClick={onPlan}
            />
          }
        >
          <Plus />
        </TooltipTrigger>
        <TooltipContent>{planLabel}</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="minimal"
              size="small"
              aria-label={moveAllLabel}
              onClick={onMoveAll}
            />
          }
        >
          <ArrowRight />
        </TooltipTrigger>
        <TooltipContent>{moveAllLabel}</TooltipContent>
      </Tooltip>
    </>
  );
}
