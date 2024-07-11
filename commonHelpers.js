import{a as $,i as h,S as v}from"./assets/vendor-b0d10f48.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}})();const C="44778442-2a526b123707daef27dd3bad3",E="https://pixabay.com/api/";async function g(t,r=1,n=15){const o=`${E}?key=${C}&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${n}`;try{const e=await $.get(o);if(e.status!==200)throw new Error("Запит завершився з помилкою "+e.status);const s=e.data.totalHits||0;return{images:e.data.hits||[],total:s}}catch(e){return console.error("Помилка при отриманні даних:",e),{images:[],total:0}}}function I(){const t=document.querySelector("#gallery");t.innerHTML=""}function u(t){h.error({title:"Error",message:t,position:"topCenter"})}function w(){h.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter"})}function L(){const t=document.getElementById("loaderContainer");t&&(t.style.display="block")}function c(){const t=document.getElementById("loaderContainer");t&&(t.style.display="none")}const S=document.querySelector("#search-form"),q=document.querySelector("#search-input"),a=document.querySelector("#gallery"),b=new v(".gallery a"),d=document.querySelector("#loadMoreBtn"),p=document.querySelector("#endMessage");let i="",y=1,f=0,m=0;S.addEventListener("submit",async function(t){if(t.preventDefault(),i=q.value.trim(),i===""){u("Будь ласка, введіть пошуковий запит");return}I(),L();try{const{images:r,total:n}=await g(i,y);if(c(),f=n,r.length===0){w();return}r.forEach(o=>{const e=document.createElement("div");e.classList.add("gallery-item"),e.innerHTML=`
        <a href="${o.largeImageURL}" data-lightbox="image">
          <img src="${o.webformatURL}" alt="${o.tags}">
          <div class="details">
            <p>Likes: ${o.likes}</p>
            <p>Views: ${o.views}</p>
            <p>Comments: ${o.comments}</p>
            <p>Downloads: ${o.downloads}</p>
          </div>
        </a>
      `,a.appendChild(e)}),b.refresh(),a.children.length>0&&(m=a.children[0].getBoundingClientRect().height),window.scrollBy({top:m*2,behavior:"smooth"}),r.length<15||a.children.length>=f?(d.style.display="none",p.style.display="block"):(d.style.display="block",p.style.display="none")}catch(r){c(),console.error("Помилка пошуку зображень:",r),u("Не вдалося отримати зображення. Будь ласка, спробуйте ще раз пізніше.")}});d.addEventListener("click",async function(){y++,L();try{const{images:t}=await g(i,y);if(c(),t.length===0){w();return}t.forEach(r=>{const n=document.createElement("div");n.classList.add("gallery-item"),n.innerHTML=`
        <a href="${r.largeImageURL}" data-lightbox="image">
          <img src="${r.webformatURL}" alt="${r.tags}">
          <div class="details">
            <p>Likes: ${r.likes}</p>
            <p>Views: ${r.views}</p>
            <p>Comments: ${r.comments}</p>
            <p>Downloads: ${r.downloads}</p>
          </div>
        </a>
      `,a.appendChild(n)}),b.refresh(),window.scrollBy({top:m*2,behavior:"smooth"}),a.children.length>=f&&(d.style.display="none",p.style.display="block")}catch(t){c(),console.error("Помилка завантаження додаткових зображень:",t),u("Не вдалося завантажити додаткові зображення. Будь ласка, спробуйте ще раз пізніше.")}});
//# sourceMappingURL=commonHelpers.js.map
