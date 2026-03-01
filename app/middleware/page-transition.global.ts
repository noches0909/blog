const TAB_ORDER = {
  "/": 0,
  "/blog": 1,
  "/project": 2,
  "/about": 3,
} as const

function normalizePath(path: string) {
  if (!path || path === "/") {
    return "/"
  }

  return path.endsWith("/") ? path.slice(0, -1) : path
}

function getSectionPath(path: string) {
  const normalized = normalizePath(path)
  if (normalized === "/") {
    return "/"
  }

  const [first] = normalized.split("/").filter(Boolean)
  return first ? `/${first}` : "/"
}

function getPathDepth(path: string) {
  return normalizePath(path).split("/").filter(Boolean).length
}

function getOrder(path: string) {
  return TAB_ORDER[path as keyof typeof TAB_ORDER]
}

export default defineNuxtRouteMiddleware((to, from) => {
  const toPath = normalizePath(to.path)
  const fromPath = normalizePath(from.path)

  if (toPath === fromPath) {
    return
  }

  let transitionName = "page-fade"

  const toTabOrder = getOrder(toPath)
  const fromTabOrder = getOrder(fromPath)

  if (toTabOrder !== undefined && fromTabOrder !== undefined) {
    transitionName = toTabOrder > fromTabOrder ? "page-tab-forward" : "page-tab-back"
  } else {
    const toSectionOrder = getOrder(getSectionPath(toPath))
    const fromSectionOrder = getOrder(getSectionPath(fromPath))

    if (
      toSectionOrder !== undefined &&
      fromSectionOrder !== undefined &&
      toSectionOrder !== fromSectionOrder
    ) {
      transitionName =
        toSectionOrder > fromSectionOrder ? "page-tab-forward" : "page-tab-back"
    } else {
      const toDepth = getPathDepth(toPath)
      const fromDepth = getPathDepth(fromPath)

      if (toDepth > fromDepth) {
        transitionName = "page-stack-forward"
      } else if (toDepth < fromDepth) {
        transitionName = "page-stack-back"
      }
    }
  }

  to.meta.pageTransition = {
    name: transitionName,
    mode: "out-in",
  }
})
