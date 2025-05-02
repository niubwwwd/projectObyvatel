// Funkcja do walidacji daty w formacie DD.MM.YYYY
function isValidDate(dateString) {
  const regex = /^\d{2}\.\d{2}\.\d{4}$/;
  if (!regex.test(dateString)) return false;

  const [day, month, year] = dateString.split('.').map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day &&
    year >= 1900 &&
    year <= new Date().getFullYear()
  );
}

// Funkcja do walidacji pól
function validateInputs(inputs) {
  let isValid = true;
  inputs.forEach((input) => {
    const inputElement = document.getElementById(input.id);
    const errorElement = inputElement.parentElement.querySelector(".error");
    const value = inputElement.value.trim();

    if (!value || (input.validate && !input.validate(value))) {
      inputElement.parentElement.classList.add("error_shown");
      isValid = false;
    } else {
      inputElement.parentElement.classList.remove("error_shown");
    }
  });
  return isValid;
}

// Obsługa uploadu zdjęcia
const uploadElement = document.querySelector(".upload");
const uploadImage = document.querySelector(".upload_uploaded");
let uploadedImageUrl = null;

uploadElement.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedImageUrl = e.target.result;
        uploadImage.src = uploadedImageUrl;
        uploadElement.classList.add("upload_loaded");
        uploadElement.classList.remove("upload_loading");
        uploadElement.querySelector(".error").style.opacity = 0;
      };
      reader.readAsDataURL(file);
      uploadElement.classList.add("upload_loading");
    }
  };
  input.click();
});

// Lista pól do walidacji
const inputs = [
  { id: "name" },
  { id: "surname" },
  { id: "sex" },
  { id: "nationality" },
  { id: "birthday", validate: isValidDate },
  { id: "familyName" },
  { id: "fathersFamilyName" },
  { id: "mothersFamilyName" },
  { id: "birthPlace" },
  { id: "countryOfBirth" },
  { id: "adress1" },
  { id: "adress2" },
  { id: "city" },
  { id: "checkInDate", validate: isValidDate },
];

// Obsługa przycisku "wejdź"
const goButton = document.querySelector(".go");
goButton.addEventListener("click", () => {
  // Walidacja pól
  const isValid = validateInputs(inputs);

  // Walidacja zdjęcia
  let photoValid = true;
  if (!uploadedImageUrl) {
    uploadElement.querySelector(".error").style.opacity = 1;
    photoValid = false;
  }

  if (!isValid || !photoValid) {
    return;
  }

  // Zbieranie danych z formularza
  const params = new URLSearchParams();
  inputs.forEach(({ id }) => {
    const value = document.getElementById(id).value.trim();
    params.append(id, value);
  });

  // Dodanie zdjęcia jako parametr
  params.append("image", uploadedImageUrl);

  // Przekierowanie do id.html z parametrami
  window.location.href = `id.html?${params.toString()}`;
});

// Rozwijanie instrukcji
const guideHolder = document.querySelector(".guide_holder");
const arrow = document.querySelector(".arrow");
guideHolder.addEventListener("click", () => {
  guideHolder.classList.toggle("unfolded");
  arrow.style.transform = guideHolder.classList.contains("unfolded")
    ? "rotate(90deg)"
    : "rotate(0deg)";
});
