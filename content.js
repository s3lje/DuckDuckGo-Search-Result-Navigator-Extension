document.addEventListener('keydown', (event) => {
  if (event.key === "Tab") {
    let resultItems = document.querySelectorAll('.react-results--main li');

    // Make sure each <li> is focusable by setting a tabindex
    // because they are not focusable by default, at least not
    // in Firefox
    resultItems.forEach(item => {
      if (!item.hasAttribute('tabindex')) {
        item.setAttribute('tabindex', '0');  // Make <li> focusable
      }
    });

    let activeElement = document.activeElement;
    let currentIndex = Array.from(resultItems).indexOf(activeElement);

    // Here the conditional controls wether we go backwards or forwards
    let nextIndex = currentIndex + (event.shiftKey ? -1 : 1);

    // Ensure that nextIndex is within bounds
    if (nextIndex >= 0 && nextIndex < resultItems.length) {
        resultItems[nextIndex].focus();
        event.preventDefault();     // Make sure tab doesnt do its usual action
    }
  }
});
