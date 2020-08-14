/**
 * The files added to the drop target
 * @var {File[]}
 */
const files = []

/**
 * Add event listeners to drop target
 * @param {Element} target
 */
const setup = (target) => {
  // Display feedback when dragging in
  target.addEventListener('dragover', dragHandler.bind(this))
  target.addEventListener('dragenter', dragHandler.bind(this))

  // Display feedback when dragging out
  target.addEventListener('dragleave', resetHandler.bind(this))

  // Handle dropped files
  target.addEventListener('drop', dropHandler.bind(this))
}

/**
 * Check if drag events should allow drops
 * @param {Event} - The drag or drop event
 */
const dragValidator = (event) => {
  const { types } = event.dataTransfer
  if (types.length === 1 && types[0] === 'Files') {
    event.preventDefault()
    event.stopPropagation()
    return true
  }

  return false
}

/**
 * Display feedback when dragging valid files
 * @param {Event} - The dragover or dragenter event
 */
const dragHandler = (event) => {
  if (dragValidator(event)) {
    event.target.classList.add('-dragover')
  }
}

/**
 * Reset the drag handler to it's non-dragover state
 * @param {Event} - The dragleave or drop event
 */
const resetHandler = (event) => {
  event.target.classList.remove('-dragover')
}

/**
 * Handle dropped files
 * @param {Event} - The drop event
 */
const dropHandler = (event) => {
  if (dragValidator(event)) {
    resetHandler(event)
    files.push(...event.dataTransfer.files)
    console.log(files)
  }
}

export {
  setup,
  files,
}
