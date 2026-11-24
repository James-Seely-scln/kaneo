import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Breadcrumbs,
  Button,
  Dialog,
  InputGroup,
  PopoverNext,
  type BreadcrumbProps,
} from "@blueprintjs/core";
import { SquarePlusIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import icons from "@/constants/project-icons";
import useCreateProject from "@/hooks/mutations/project/use-create-project";
import { prefetchBoard } from "@/hooks/queries/task/prefetch-board";
import useActiveWorkspace from "@/hooks/queries/workspace/use-active-workspace";
import { useCanImport } from "@/hooks/use-can-import";
import generateProjectSlug from "@/lib/generate-project-id";
import { toast } from "@/lib/toast";

type CreateProjectModalProps = {
  open: boolean;
  onClose: () => void;
};

function CreateProjectModal({ open, onClose }: CreateProjectModalProps) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("Layout");
  const [iconPopoverOpen, setIconPopoverOpen] = useState(false);
  const [iconSearch, setIconSearch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { data: workspace } = useActiveWorkspace();
  const { canImport } = useCanImport();
  const { mutateAsync } = useCreateProject({
    name,
    slug,
    workspaceId: workspace?.id ?? "",
    icon: selectedIcon,
  });
  const SelectedIcon =
    icons[selectedIcon as keyof typeof icons] || icons.Layout;
  const filteredIcons = Object.entries(icons).filter(([iconName]) =>
    iconName.toLowerCase().includes(iconSearch.trim().toLowerCase()),
  );
  const navigate = useNavigate();

  const handleClose = () => {
    setName("");
    setSlug("");
    setSelectedIcon("Layout");
    setIconPopoverOpen(false);
    setIconSearch("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      const { id } = await mutateAsync();
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["projects"] }),
        prefetchBoard(queryClient, id),
      ]);

      await navigate({
        to: "/dashboard/workspace/$workspaceId/project/$projectId/board",
        params: {
          workspaceId: workspace?.id ?? "",
          projectId: id,
        },
      });

      toast.success("Project created successfully", { icon: SquarePlusIcon });
      handleClose();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : t("common:modals.createProject.errorToast"),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setSlug(generateProjectSlug(newName));
  };

  const breadcrumbItems: BreadcrumbProps[] = [
    {
      text:
        workspace?.name?.toUpperCase() ||
        t("common:modals.createProject.workspaceFallback"),
    },
    {
      text: t("common:modals.createProject.breadcrumbNew"),
      current: true,
    },
  ];

  return (
    <Dialog
      isOpen={open}
      onClose={handleClose}
      style={{ maxWidth: 448 }}
      aria-label={t("common:modals.createProject.title")}
      aria-describedby="create-project-desc"
    >
      <span id="create-project-desc" className="sr-only">
        {t("common:modals.createProject.description")}
      </span>

      <div className="px-3 pt-4 pb-1">
        <Breadcrumbs items={breadcrumbItems} className="text-xs" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-6 px-3 pt-2">
          <PopoverNext
            isOpen={iconPopoverOpen}
            onInteraction={(nextOpenState) => {
              setIconPopoverOpen(nextOpenState);
              if (!nextOpenState) setIconSearch("");
            }}
            placement="bottom-start"
            content={
              <div className="w-64 p-2">
                <div className="space-y-2">
                  <InputGroup
                    value={iconSearch}
                    onChange={(e) => setIconSearch(e.target.value)}
                    placeholder={t("common:modals.createProject.searchIcons")}
                    size="small"
                    fill
                  />
                  <div className="max-h-[280px] overflow-y-auto pr-1">
                    <div className="grid grid-cols-6 gap-1.5">
                      {filteredIcons.map(([iconName, Icon]) => {
                        const isSelected = selectedIcon === iconName;
                        return (
                          <Button
                            key={iconName}
                            variant="minimal"
                            intent={isSelected ? "primary" : undefined}
                            onClick={() => {
                              setSelectedIcon(iconName);
                              setIconPopoverOpen(false);
                              setIconSearch("");
                            }}
                            className="h-10 w-10 p-0"
                            title={iconName}
                            icon={<Icon className="h-4 w-4" />}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            }
            renderTarget={(props) => (
              <Button
                {...props}
                title={t("common:modals.createProject.pickIcon")}
                icon={<SelectedIcon className="h-4 w-4" />}
              />
            )}
          />

          <InputGroup
            value={name}
            onChange={handleNameChange}
            autoFocus
            placeholder={t("common:modals.createProject.projectName")}
            size="large"
            fill
            required
            inputClassName="!text-2xl !font-semibold !tracking-tight !bg-transparent !border-0 !shadow-none !px-0"
          />
        </div>

        <div className="space-y-3 px-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                {t("common:modals.createProject.keyLabel")}
              </span>
              <InputGroup
                id="project-key"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="PRO"
                maxLength={8}
                className="w-20"
                inputClassName="!text-center !font-semibold"
                required
              />
            </div>
            <div className="flex-1 text-xs text-muted-foreground opacity-80">
              {t("common:modals.createProject.keyHint", {
                example: slug || "ABC",
              })}
            </div>
          </div>
          {canImport && (
            <p className="text-muted-foreground text-xs">
              {t("settings:workspaceImport.entry.createProjectPrompt")}{" "}
              <Link
                to="/dashboard/settings/workspace/import"
                onClick={handleClose}
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                {t("settings:workspaceImport.entry.createProjectLink")}
              </Link>
            </p>
          )}
        </div>

        <div className="flex justify-end gap-2 px-3 pb-3">
          <Button onClick={handleClose} size="small">
            {t("common:actions.cancel")}
          </Button>
          <Button
            type="submit"
            disabled={!name.trim() || !slug.trim()}
            loading={isSubmitting}
            size="small"
            intent="primary"
          >
            {t("common:modals.createProject.createButton")}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

export default CreateProjectModal;