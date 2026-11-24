import type { getAdminAuditLog } from "./get-admin-audit-log";

export const ADMIN_AUDIT_LOG_PAGE_SIZE = 25;

type AdminAuditLogResult = Awaited<ReturnType<typeof getAdminAuditLog>>;

export type AdminAuditLogEntry = AdminAuditLogResult["entries"][number];
