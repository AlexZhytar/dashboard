export const modalText = {
  addProject: {
    buttons: {
      submit: "Add Project",
      cancel: "Cancel",
      addLink: "Add Link"
    },
    labels: {
      name: "Project Name",
      color: "Accent Color",
      assignee: "Assignee",
      approved: "Approved Hours (h)",
      monthly: "Monthly Plan (h)",
      links: "Links"
    }
  }
}

export const modalAnimations = {
  init(variants) {
    return {
      initial: 'initial',
      animate: 'animate',
      exit: 'exit',
      variants
    }
  },

  fadeModal() {
    return {
      initial: { opacity: 0, },
      animate: { opacity: 1, },
      exit: { opacity: 0, }
    }
  },

  slideModalCenter() {
    return {
      initial: { scale: 0 },
      animate: { scale: 1 },
      exit: { scale: .5 }
    }
  },

  slideModalRight() {
    return {
      initial: { x: "100%", },
      animate: { x: "0%", },
      exit: { x: "100%", }
    }
  },

  slideModalLeft() {
    return {
      initial: { x: "-100%", },
      animate: { x: "0%", },
      exit: { x: "-100%", }
    }
  },

  slideModalTop() {
    return {
      initial: { y: "-100%", },
      animate: { y: "0%", },
      exit: { y: "-100%", }
    }
  },

  slideModalBot() {
    return {
      initial: { y: "100%", },
      animate: { y: "0%", },
      exit: { y: "100%", }
    }
  }
}