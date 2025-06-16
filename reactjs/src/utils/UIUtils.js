export const uncheckCheckboxes = () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
}

export const changeAlertState = (label, variant, hidden) => {
  return {
    label: label,
    variant: variant,
    hidden: hidden
  }
}