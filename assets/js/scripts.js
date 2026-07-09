$(document).ready(function () {

$('#dismiss, .overlay').on('click', function () {
    $('#sidebar').removeClass('active');
    $('.overlay').removeClass('active');
    $("body").removeClass('no-scrolling');
    $(".open-menu").html('<p class="mobile-menu header-link mr-4 my-auto"><i class="fa-solid fa-bars"></i></p>')

});

$('.open-menu').on('click', function () {
    $('#sidebar').toggleClass('active');
    $('.overlay').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    $("body").toggleClass('no-scrolling');
    $(".open-menu").toggleHtml(this,'<p class="mobile-menu header-link mr-4 my-auto"><i class="fa-solid fa-xmark"></i></p>','<p class="mobile-menu header-link mr-4 my-auto"><i class="fa-solid fa-bars"></i></p>')
});
});

$.fn.toggleHtml = function(me,t1, t2){
  if ($(me).html() == t1){
        $(me).html(t2)
  } else {
    $(me).html(t1);
  }
};

if($(".review-container-one").length >0 ){
const reviewsContainer = document.getElementsByClassName('review-container-one')[0];
const ReviewsScrollWidth = reviewsContainer.scrollWidth;
window.addEventListener('load', () => {
  self.setInterval(() => {
    if (reviewsContainer.scrollLeft !== ReviewsScrollWidth) {
      reviewsContainer.scrollTo(reviewsContainer.scrollLeft + 1, 0);
    } else {
        reviewsContainer.scrollTo(0, 0); 
    }
  }, 30);
});
const reviewsContainer2 = document.getElementsByClassName('review-container-two')[0];
const ReviewsScrollWidth2 = reviewsContainer2.scrollWidth;
window.addEventListener('load', () => {
  self.setInterval(() => {
    if (reviewsContainer2.scrollLeft !== ReviewsScrollWidth2) {
      reviewsContainer2.scrollTo(reviewsContainer2.scrollLeft + 1, 0);
    } else {
        reviewsContainer2.scrollTo(0, 0); 
    }
  }, 30);
});
const reviewsContainer3 = document.getElementsByClassName('review-container-three')[0];
const ReviewsScrollWidth3 = reviewsContainer3.scrollWidth;
window.addEventListener('load', () => {
  self.setInterval(() => {
    if (reviewsContainer3.scrollLeft !== ReviewsScrollWidth3) {
      reviewsContainer3.scrollTo(reviewsContainer3.scrollLeft + 1, 0);
    } else {
        reviewsContainer3.scrollTo(0, 0); 
    }
  }, 30);
});
}

q_count = 1;
a_count = 1;
$('.faq-question').each(function( index ) {
$(this).attr('href','#faq_'+q_count)
q_count++
})
$('.faq-answer').each(function( index ) {
$(this).attr('id','faq_'+a_count)
a_count++
})

(function () {
  if (!('addEventListener' in window) || !document.head) return;
  var conn = navigator.connection;
  if (conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ''))) return; // respect data saver / slow links

  var prefetched = {};
  var timer;
  var canPrefetch = (function () {
    var l = document.createElement('link');
    return !!(l.relList && l.relList.supports && l.relList.supports('prefetch'));
  })();

  function prefetch(url) {
    if (prefetched[url]) return;
    prefetched[url] = true;
    if (canPrefetch) {
      var link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    } else {
      try { fetch(url, { credentials: 'same-origin' }); } catch (e) {}
    }
  }

  function eligible(a) {
    if (!a || !a.href) return false;
    if (a.origin !== location.origin) return false;       // same-site only
    if (a.hasAttribute('download')) return false;
    var raw = a.getAttribute('href') || '';
    if (raw.charAt(0) === '#') return false;               // in-page anchor
    if (a.href.split('#')[0] === location.href.split('#')[0]) return false; // current page
    if (a.hasAttribute('data-no-prefetch')) return false;
    return true;
  }

  document.addEventListener('mouseover', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!eligible(a)) return;
    clearTimeout(timer);
    timer = setTimeout(function () { prefetch(a.href); }, 65);
  }, { passive: true });

  document.addEventListener('mouseout', function () { clearTimeout(timer); }, { passive: true });

  document.addEventListener('touchstart', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (eligible(a)) prefetch(a.href);
  }, { passive: true });
})();

/* ---- Floating click-to-call button (mobile-first conversion) ---- */
(function () {
  function add() {
    if (document.getElementById('msl-call-fab')) return;
    var a = document.createElement('a');
    a.id = 'msl-call-fab';
    a.href = 'tel:1300442497';
    a.setAttribute('aria-label', 'Call Money Sense Lending on 1300 442 497');
    a.innerHTML = '<i class="fa-solid fa-phone"></i><span>Call 1300 442 497</span>';
    a.style.cssText = 'position:fixed;right:16px;bottom:16px;z-index:99999;background:#e25928;color:#fff;padding:13px 20px;border-radius:50px;font-weight:700;text-decoration:none;box-shadow:0 6px 18px rgba(0,0,0,.28);display:inline-flex;align-items:center;gap:9px;font-size:1rem;line-height:1';
    document.body.appendChild(a);
  }
  if (document.body) add(); else document.addEventListener('DOMContentLoaded', add);
})();

// ---- Live Google review count (Featurable — synced to the GBP profile) ----
// Fetches the real review count from Featurable's API (12h localStorage cache)
// and freshens every visible badge, the <title>, and JSON-LD aggregateRating.
// Counts only ever go UP from the static values baked into the HTML.
(function(){
  var API='https://featurable.com/api/v2/widgets/0b7a6c84-2cf4-45b7-99f8-1b5cd5c94f73';
  var KEY='msl_rev_v1';
  function apply(count){
    if(!count||count<100) return; // sanity floor — never trust a tiny/garbage value
    var up=function(num){return Math.max(parseInt(num,10),count);};
    var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null);
    var n;
    while((n=w.nextNode())){
      var t=n.nodeValue;
      if(!/\d{2,4}\s*(?:★|(?:Google\s+)?[Rr]eviews)/.test(t)&&!/from\s+\d{2,4}/i.test(t)) continue;
      var nt=t
        .replace(/(\bfrom\s+)(\d{2,4})(\s+(?:Google\s+)?[Rr]eviews)/g,function(m,a,num,b){return a+up(num)+b;})
        .replace(/(\d{2,4})(\s*★)/g,function(m,num,b){return up(num)+b;});
      if(nt!==t) n.nodeValue=nt;
    }
    document.title=document.title.replace(/(\d{2,4})(\s*★)/,function(m,num,b){return up(num)+b;});
    var scripts=document.querySelectorAll('script[type="application/ld+json"]');
    for(var i=0;i<scripts.length;i++){
      try{
        var j=JSON.parse(scripts[i].textContent), touched=false;
        (function walk(o){
          if(o&&typeof o==='object'){
            if(o['@type']==='AggregateRating'){
              if(o.reviewCount&&parseInt(o.reviewCount,10)<count){o.reviewCount=String(count);touched=true;}
              if(o.ratingCount&&parseInt(o.ratingCount,10)<count){o.ratingCount=String(count);touched=true;}
            }
            for(var k in o) walk(o[k]);
          }
        })(j);
        if(touched) scripts[i].textContent=JSON.stringify(j);
      }catch(e){}
    }
  }
  function run(count){ if(document.body){apply(count);} else {document.addEventListener('DOMContentLoaded',function(){apply(count);});} }
  try{
    var c=JSON.parse(localStorage.getItem(KEY)||'null');
    if(c&&c.t>Date.now()-43200000){ run(c.n); return; }
  }catch(e){}
  fetch(API).then(function(r){return r.json();}).then(function(j){
    var s=j&&j.widget&&j.widget.gbpLocationSummary;
    if(!s||!s.reviewsCount) return;
    try{localStorage.setItem(KEY,JSON.stringify({n:s.reviewsCount,t:Date.now()}));}catch(e){}
    run(s.reviewsCount);
  }).catch(function(){});
})();
