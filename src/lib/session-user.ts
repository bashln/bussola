interface SessionLike {
  user?: { id?: string | null } | null;
}

export function sessionUserId(session: SessionLike | null | undefined): string | null {
  const id = session?.user?.id;
  return typeof id === "string" && id.length > 0 ? id : null;
}
