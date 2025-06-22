// ① 取りたいキー一覧
const KEYS = ['utm_source','utm_medium','utm_campaign'];

// ② URL 解析
const qs   = new URLSearchParams(location.search);

// ③ localStorage とメモリに保存
const store = {};
KEYS.forEach(k=>{
  const v = qs.get(k);
  if(v) localStorage.setItem(k,v);        // 永続保存
  store[k] = localStorage.getItem(k);     // 取り出し
});

// ④ 画面に表示＆コピー
let current = 'utm_source';
function render(){
  const val = store[current];
  document.getElementById('utmValue').textContent = val;
  document.getElementById('badge').style.display = val?'inline-block':'none';
}
render();

// タブ切替
document.querySelectorAll('[data-key]').forEach(btn=>{
  btn.onclick = e=>{ current=e.target.dataset.key; render(); };
});

// クリック→コピー＋GA4
document.getElementById('badge').onclick = ()=>{
  const val = store[current];
  navigator.clipboard.writeText(val).then(()=>{
    if(window.gtag){
      gtag('event','copy_utm',{utm_key:current,utm_val:val});
    }
    alert(`${val} をコピーしました`);
  });
};
