class DragDrop {
  constructor(target) {
    this.target = target
    this.counter = target.querySelector('[data-count]')
    this.picker = target.querySelector('input[type="file"]')
    this.files = []
    this.setup()
  }

  /**
   * Add event listeners to drop target
   */
  setup() {
    // Display feedback when dragging in
    this.target.addEventListener('dragover', this.showTarget.bind(this))
    this.target.addEventListener('dragenter', this.showTarget.bind(this))

    // Display feedback when dragging out
    this.target.addEventListener('dragleave', this.hideTarget.bind(this))

    // Handle dropped files
    this.target.addEventListener('drop', this.drop.bind(this))

    // Listen for changes to picked files
    this.picker.addEventListener('change', this.update.bind(this))
  }

  /**
   * Check if drag events should allow drops
   * @param {Event} - The drag or drop event
   */
  dropAllowed(event) {
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
  showTarget(event) {
    if (this.dropAllowed(event)) {
      this.target.classList.add('-dragover')
    }
  }

  /**
   * Reset the drag handler to it's non-dragover state
   * @param {Event} - The dragleave or drop event
   */
  hideTarget(event) {
    this.target.classList.remove('-dragover')
  }

  /**
   * Handle dropped files
   * @param {Event} - The drop event
   */
  drop(event) {
    if (this.dropAllowed(event)) {
      this.hideTarget(event)
      this.files.push(...event.dataTransfer.files)
      this.update()
    }
  }

  /**
   * Show and update the file count message
   */
  update() {
    console.log(this.picker.files.length)
    const count = this.picker.files.length + this.files.length
    this.counter.setAttribute('data-count', count)
    if (count > 0) {
      this.target.classList.add('-filled')
    } else {
      this.target.classList.remove('-filled')
    }
  }

  /**
   * Reset the dropped files
   */
  reset() {
    this.files = []
    this.update()
  }
}

export default DragDrop
