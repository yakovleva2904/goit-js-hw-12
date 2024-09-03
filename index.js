import{a as m,S as L,i as l}from"./assets/vendor-D6BwaWIN.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const p of r.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&o(p)}).observe(document,{childList:!0,subtree:!0});function i(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=i(s);fetch(s.href,r)}})();const g=t=>`
    <li class="gallery-card">
      <a class="gallery-link" href="${t.largeImageURL}">
        <img
          class="gallery-img"
          src="${t.webformatURL}"
          alt="${t.tags}"
        />
      </a>
      <ul class="gallery-list">
        <li class="gallery-list-item">
          <p>Likes</p>
          <p>${t.likes}</p>
        </li>
        <li class="gallery-list-item">
          <p>Views</p>
          <p>${t.views}</p>
        </li>
        <li class="gallery-list-item">
          <p>Comments</p>
          <p>${t.comments}</p>
        </li>
        <li class="gallery-list-item">
          <p>Downloads</p>
          <p>${t.downloads}</p>
        </li>
      </ul>
    </li>
`;m.defaults.baseURL="https://pixabay.com/api/";const y=(t,e)=>{const i={params:{key:"45763885-c72d1bc3425850e6a878d2d7a",q:t,image_type:"photo",orientation:"horizontal",page:e,per_page:15,safesearch:!0}};return m.get("",i)},n=document.querySelector(".js-search-form"),h=document.querySelector(".js-gallery"),a=document.querySelector(".loader");a.classList.add("is-hidden");const u=document.querySelector(".js-load-more");let c=1,d="";const f=new L(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250,overlayOpacity:.8}),b=async t=>{try{if(t.preventDefault(),d=n.elements.user_query.value.trim(),c=1,a.classList.remove("is-hidden"),!d){a.classList.add("is-hidden"),l.warning({message:"Please fill in the search field!",position:"topRight"});return}const e=await y(d,c);if(e.data.hits.length===0){a.classList.add("is-hidden"),l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),h.innerHTML="",n.reset();return}const i=e.data.hits.map(o=>g(o)).join("");h.innerHTML=i,u.classList.remove("is-hidden"),a.classList.add("is-hidden"),n.reset(),f.refresh()}catch(e){a.classList.add("is-hidden"),l.error({message:`Ooops! Error: ${e}`,position:"topRight"})}},v=async t=>{try{c++,a.classList.remove("is-hidden");const e=await y(d,c),i=e.data.hits.map(o=>g(o)).join("");h.insertAdjacentHTML("beforeend",i),c===Math.ceil(e.data.totalHits/15)&&(u.classList.add("is-hidden"),l.warning({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),w(),a.classList.add("is-hidden"),n.reset(),f.refresh()}catch(e){a.classList.add("is-hidden"),l.error({message:`Ooops! Error: ${e}`,position:"topRight"})}};function w(){const t=document.querySelector(".gallery-card");if(t){const e=t.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}}n.addEventListener("submit",b);u.addEventListener("click",v);
//# sourceMappingURL=index.js.map
