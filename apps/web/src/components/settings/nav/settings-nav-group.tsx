import type { SettingsNavGroup as SettingsNavGroupModel } from "@/components/settings/nav/types";
import { Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import { useNavigate } from "@tanstack/react-router";

type SettingsNavGroupProps = {
  group: SettingsNavGroupModel;
  pathname: string;
};

export function SettingsNavGroup({ group, pathname }: SettingsNavGroupProps) {
  const navigate = useNavigate();
  return (
    <Menu className="!bg-transparent">
      <MenuDivider title={group.label} />
      {group.links.map((link) => {
        const IconComponent = link.icon;
        return (
          <MenuItem
            key={link.id}
            active={pathname === link.to}
            icon={<IconComponent aria-hidden="true" />}
            text={link.label}
            href={link.to}
            onClick={(e) => {
              e.preventDefault();
              navigate({ to: link.to });
            }}
          />
        );
      })}
    </Menu>
  );
}
