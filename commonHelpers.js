import{a as b,i as h,S as L}from"./assets/vendor-b0d10f48.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const $="44778442-2a526b123707daef27dd3bad3",E="https://pixabay.com/api/";async function g(t,r=1,a=15){const o=`${E}?key=${$}&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${a}`;try{const e=await b.get(o);if(e.status!==200)throw new Error("The request failed with an error"+e.status);const s=e.data.totalHits||0;return{images:e.data.hits||[],total:s}}catch(e){return console.error("Error retrieving data:",e),{images:[],total:0}}}function C(){const t=document.querySelector("#gallery");t.innerHTML=""}function y(t){h.error({title:"Error",message:t,position:"topCenter"})}function I(){h.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter"})}function v(){const t=document.getElementById("loaderContainer");t&&(t.style.display="block")}function d(){const t=document.getElementById("loaderContainer");t&&(t.style.display="none")}const q=document.querySelector("#search-form"),S=document.querySelector("#search-input"),i=document.querySelector("#gallery"),w=new L(".gallery a"),n=document.querySelector("#loadMoreBtn"),p=document.querySelector("#endMessage");let c="",u=1,f=0,m=0;q.addEventListener("submit",async function(t){if(t.preventDefault(),c=S.value.trim(),c===""){y("Please enter a search term");return}u=1,C(),v();try{const{images:r,total:a}=await g(c,u);if(d(),f=a,r.length===0){I();return}r.forEach(o=>{const e=document.createElement("div");e.classList.add("gallery-item"),e.innerHTML=`
    <a href="${o.largeImageURL}" data-lightbox="image">
      <img src="${o.webformatURL}" alt="${o.tags}">
      <div class="details">
        <div class="detail-row">
          <p>Likes:</p>
          <p>${o.likes}</p>
        </div>
        <div class="detail-row">
          <p>Views:</p>
          <p>${o.views}</p>
        </div>
        <div class="detail-row">
          <p>Comments:</p>
          <p>${o.comments}</p>
        </div>
        <div class="detail-row">
          <p>Downloads:</p>
          <p>${o.downloads}</p>
        </div>
      </div>
    </a>
  `,i.appendChild(e)}),w.refresh(),i.children.length>0&&(m=i.children[0].getBoundingClientRect().height),window.scrollBy({top:m*2,behavior:"smooth"}),r.length<15||i.children.length>=f?(n.style.display="none",p.style.display="block"):(n.style.display="block",p.style.display="none")}catch(r){d(),console.error("Error fetching images:",r),y("Failed to fetch images. Please try again later.")}});n.addEventListener("click",async function(){u++,v();try{const{images:t}=await g(c,u);if(d(),t.length===0){n.style.display="none",p.style.display="block";return}t.forEach(r=>{const a=document.createElement("div");a.classList.add("gallery-item"),a.innerHTML=`
    <a href="${r.largeImageURL}" data-lightbox="image">
      <img src="${r.webformatURL}" alt="${r.tags}">
      <div class="details">
        <div class="detail-row">
          <p>Likes:</p>
          <p>${r.likes}</p>
        </div>
        <div class="detail-row">
          <p>Views:</p>
          <p>${r.views}</p>
        </div>
        <div class="detail-row">
          <p>Comments:</p>
          <p>${r.comments}</p>
        </div>
        <div class="detail-row">
          <p>Downloads:</p>
          <p>${r.downloads}</p>
        </div>
      </div>
    </a>
  `,i.appendChild(a)}),w.refresh(),window.scrollBy({top:m*2,behavior:"smooth"}),i.children.length>=f&&(n.style.display="none",p.style.display="block")}catch(t){d(),console.error("Error fetching more images:",t),y("Failed to load more images. Please try again later.")}});
//# sourceMappingURL=commonHelpers.js.map
