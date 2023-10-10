export const clerkStyleConfig = {
  elements: {
    headerTitle: "text-foreground h2-bold",
    card: "shadow-2xl shadow-shadow rounded-xl bg-background-lighter text-foreground",
    socialButtonsBlockButtonText: "body-regular",
    formButtonPrimary: "body-regular",
    rootBox: "text-foreground",
    formFieldLabel: "small-regular text-foreground",
    footerActionText: "small-regular text-foreground",
    footerActionLink: "small-regular text-primary",
    socialButtonsBlockButton: "bg-background-lighter border-border",
    dividerLine: "bg-foreground opacity-10",
    dividerText: "small-regular text-foreground",
    userPreviewMainIdentifier: "base-bold text-foreground-darker",
    userPreviewSecondaryIdentifier: "small-regular text-foreground-darker",
  },
  userButton: {
    elements: {
      userButtonPopoverCard: "!bg-background-light !shadow-2xl !shadow-shadow",
      userButtonPopoverActionButtonText: "body-regular text-foreground",
      userButtonPopoverFooter: "hidden",
    },
  },
  userProfile: {
    elements: {
      breadcrumbsItem: "small-regular text-foreground-darker",
      breadcrumbsItemBox: "[&>p]:text-foreground-darker [&>p]:small-regular",
      profileSectionTitle: "border-b-foreground/10",
      profileSectionTitleText: "text-foreground",
      badge: "bg-primary text-primary-foreground",
      modalCloseButton: "[& path]:text-foreground",
      navbarButtons: "gap-3",
      navbarButton: "text-foreground",
      formFieldInput: "accent-primary",
      formFieldWarningText: "text-foreground-darker",
    },
  },
};
