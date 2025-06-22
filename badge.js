// badge.js

// 1. URL から utm_source を取得
const params = new URLSearchParams(window.location.search);
const utm = params.get('utm_source');

// 2. localStorage に保存
if (utm) {
  localStorage.setItem('saved_utm', utm);
}

// 3. 保存済み値を取得
const savedUtm = localStorage.getItem('saved_utm');

// 4. バッジに表示・クリック処理
if (savedUtm) {
  const badge = document.getElementById('badge');
  const span = document.getElementById('utmValue');
  span.textContent = savedUtm;
  badge.style.display = 'inline-block';

  badge.addEventListener('click', () => {
    navigator.clipboard.writeText(savedUtm)
      .then(() => alert(`“${savedUtm}” をコピーしました！`))
      .catch(() => alert('コピーに失敗しました'));
  });
}
