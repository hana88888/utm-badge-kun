// ------------------------------
// 1) URL から UTM 値を取得＆保存
// ------------------------------
const KEYS = ['utm_source', 'utm_medium', 'utm_campaign'];
const params = new URLSearchParams(location.search);
const store  = {};                         // 画面用キャッシュ

KEYS.forEach(k => {
  const v = params.get(k);
  if (v) localStorage.setItem(k, v);       // URLにあれば上書き保存
  store[k] = localStorage.getItem(k);      // 保存済み or null
});

// ------------------------------
// 2) 画面描画ロジック
// ------------------------------
let current = 'utm_source';                // デフォルト
function render() {
  const val   = store[current];
  const badge = document.getElementById('badge');
  document.getElementById('utmValue').textContent = val;
  badge.style.display = val ? 'inline-block' : 'none';
}
render();

// タブ切替
document.querySelectorAll('[data-key]').forEach(btn => {
  btn.addEventListener('click', e => {
    current = e.target.dataset.key;
    render();
  });
});

// ------------------------------
// 3) クリックでコピー + dataLayer.push
// ------------------------------
document.getElementById('badge').onclick = () => {
  const val = store[current];
  if (!val) return;

  // デバッグ用ログ
  console.log('⭐ バッジクリック: ', current, val);

  // クリップボード
  navigator.clipboard.writeText(val).then(() => {
    alert(`「${val}」をコピーしました`);

    // GTM へイベント送信
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event:    'copy_utm',   // Trigger 名
      utm_key:  current,      // 例: utm_source
      utm_val:  val           // 例: fb
    });

    // 直後の dataLayer 内容を確認（デバッグ用）
    console.log('current DL', window.dataLayer[window.dataLayer.length - 1]);
  });
};
