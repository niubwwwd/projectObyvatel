const timeElement = document.getElementById('time');
const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

function setClock() {
  const date = new Date();
  timeElement.innerHTML = `Czas: ${date.toTimeString().split(' ')[0]} ${date.toLocaleDateString('pl-PL', options)}`;
}

setClock();
setInterval(setClock, 1000);

let webManifest = {
  name: '',
  short_name: '',
  theme_color: '#f5f6fb',
  background_color: '#f5f6fb',
  display: 'standalone',
};

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || window.opera;

  if (/windows phone/i.test(userAgent)) return 1;
  if (/android/i.test(userAgent)) return 2;
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return 3;
  return 4;
}

if (getMobileOperatingSystem() == 2) {
  document.querySelector('.bottom_bar').style.height = '70px';
}

const manifestLink = document.createElement('link');
manifestLink.rel = 'manifest';
manifestLink.href = `data:application/manifest+json;base64,${btoa(JSON.stringify(webManifest))}`;
document.head.prepend(manifestLink);

const unfoldElement = document.querySelector('.info_holder');
unfoldElement.addEventListener('click', () => {
  unfoldElement.classList.toggle('unfolded');
});

// Odczyt danych z localStorage
const userData = JSON.parse(localStorage.getItem('userData'));

if (userData) {
  const setData = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.innerHTML = value || '';
  };

  setData('name', userData.name);
  setData('surname', userData.surname);
  setData('nationality', userData.nationality);
  setData('birthday', userData.birthday);
  setData('familyName', userData.familyName);
  setData('sex', userData.sex);
  setData('fathersFamilyName', userData.fathersFamilyName);
  setData('mothersFamilyName', userData.mothersFamilyName);
  setData('birthPlace', userData.birthPlace);
  setData('countryOfBirth', userData.countryOfBirth);
  setData('adress', `ul. ${userData.adress1 || ''}<br>${userData.adress2 || ''} ${userData.city || ''}`);
  setData('checkInDate', userData.checkInDate);

  if (userData.birthday) {
    const [day, month, year] = userData.birthday.split('.').map((v) => parseInt(v, 10));
    const adjustedMonth = year >= 2000 ? 20 + month : month;
    const peselSuffix = userData.sex?.toLowerCase() === 'mężczyzna' ? '0295' : '0382';
    const pesel = `${year % 100}${adjustedMonth.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}${peselSuffix}7`;
    setData('pesel', pesel);
  }

  // Ustawienie zdjęcia
  if (userData.image) {
    document.querySelector('.id_own_image').style.backgroundImage = `url(${userData.image})`;
  }
}
