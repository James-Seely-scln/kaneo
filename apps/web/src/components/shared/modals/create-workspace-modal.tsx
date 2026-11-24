import { useNavigate } from "@tanstack/react-router";
import {
  Breadcrumbs,
  Button,
  Dialog,
  InputGroup,
  OverlayToaster,
  Position,
  type BreadcrumbProps,
  type Toaster,
} from "@blueprintjs/core";
import { SquarePlusIcon } from "@blueprintjs/icons/next";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useCreateWorkspace from "@/hooks/queries/workspace/use-create-workspace";
import { authClient } from "@/lib/auth-client";

// Module-level lazy singleton – OverlayToaster.create() is async and should
// be called once per app so toasts share one container.
let toasterPromise: Promise<Toaster> | null = null;
const getToaster = () => {
  if (!toasterPromise) {
    toasterPromise = OverlayToaster.create({ position: Position.TOP });
  }
  return toasterPromise;
};

type CreateWorkspaceModalProps = {
  open: boolean;
  onClose: () => void;
};

function CreateWorkspaceModal({ open, onClose }: CreateWorkspaceModalProps) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { mutateAsync } = useCreateWorkspace();

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  const handleClose = () => {
    setName("");
    setDescription("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      const createdWorkspace = await mutateAsync({ name, description });

      await authClient.organization.setActive({
        organizationId: createdWorkspace.id,
      });

      await navigate({
        to: "/dashboard/workspace/$workspaceId",
        params: {
          workspaceId: createdWorkspace.id,
        },
      });

      const toaster = await getToaster();
      toaster.show({
        message: t("common:modals.createWorkspace.successToast"),
        intent: "success",
        icon: <SquarePlusIcon />,
      });
      handleClose();
    } catch (error) {
      const toaster = await getToaster();
      toaster.show({
        message:
          error instanceof Error
            ? error.message
            : t("common:modals.createWorkspace.errorToast"),
        intent: "danger",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const breadcrumbItems: BreadcrumbProps[] = [
    {
      text: t("common:modals.createWorkspace.breadcrumbKaneo"),
    },
    {
      text: t("common:modals.createWorkspace.title"),
      current: true,
    },
  ];

  return (
    <Dialog
      isOpen={open}
      onClose={handleClose}
      style={{ maxWidth: 448 }}
      aria-label={t("common:modals.createWorkspace.title")}
      aria-describedby="create-workspace-desc"
    >
      <span id="create-workspace-desc" className="sr-only">
        {t("common:modals.createWorkspace.description")}
      </span>

      <div className="px-3 pt-4 pb-1">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4 px-3">
          <InputGroup
            inputRef={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("common:modals.createWorkspace.namePlaceholder")}
            size="large"
            fill
            required
            inputClassName="!text-2xl !font-semibold !tracking-tight !bg-transparent !border-0 !shadow-none !px-0"
          />

          <InputGroup
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t(
              "common:modals.createWorkspace.descriptionPlaceholder",
            )}
            fill
            inputClassName="!text-base !leading-relaxed !bg-transparent !border-0 !shadow-none !px-0"
          />
        </div>

        <div className="flex justify-end gap-2 px-3 pb-3">
          <Button
            type="button"
            onClick={handleClose}
            size="small"
          >
            {t("common:actions.cancel")}
          </Button>
          <Button
            type="submit"
            disabled={!name.trim()}
            loading={isSubmitting}
            size="small"
            intent="primary"
          >
            {t("common:modals.createWorkspace.createButton")}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

export default CreateWorkspaceModal;