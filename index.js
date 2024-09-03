import{i as n,S as u}from"./assets/vendor-B07T6_gy.js";(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const p=r=>`
    <li class="gallery-card">
      <a class="gallery-link" href="${r.largeImageURL}">
        <img
          class="gallery-img"
          src="${r.webformatURL}"
          alt="${r.tags}"
        />
      </a>
      <ul class="gallery-list">
        <li class="gallery-list-item">
          <p>Likes</p>
          <p>${r.likes}</p>
        </li>
        <li class="gallery-list-item">
          <p>Views</p>
          <p>${r.views}</p>
        </li>
        <li class="gallery-list-item">
          <p>Comments</p>
          <p>${r.comments}</p>
        </li>
        <li class="gallery-list-item">
          <p>Downloads</p>
          <p>${r.downloads}</p>
        </li>
      </ul>
    </li>
`,m="https://pixabay.com/api/",h=r=>{const l=new URLSearchParams({key:"45763885-c72d1bc3425850e6a878d2d7a",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${m}?${l}`).then(s=>{if(!s.ok)throw new Error(s.status);return s.json()})},a=document.querySelector(".js-search-form"),d=document.querySelector(".js-gallery"),o=document.querySelector(".loader");o.classList.add("is-hidden");const y=r=>{r.preventDefault();const l=a.elements.user_query.value.trim();if(o.classList.remove("is-hidden"),!l){o.classList.add("is-hidden"),n.warning({message:"Please fill in the search field!",position:"topRight"});return}h(l).then(s=>{if(o.classList.add("is-hidden"),s.hits.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),d.innerHTML="",a.reset();return}const i=s.hits.map(t=>p(t)).join("");d.innerHTML=i;const e=new u(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250,overlayOpacity:.8});a.reset(),e.refresh()}).catch(s=>{console.log(s)})};a.addEventListener("submit",y);
//# sourceMappingURL=index.js.map
