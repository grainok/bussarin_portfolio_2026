const preview=document.querySelector('#app-preview');
const video=document.querySelector('#theme-video');
const full=document.querySelector('#theme-full');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reducedMotion){video.autoplay=false;video.pause();}
document.querySelectorAll('[data-theme]').forEach(button=>button.addEventListener('click',()=>{
 const theme=button.dataset.theme;
 const shouldPlay=!reducedMotion&&!video.paused;
 document.querySelectorAll('[data-theme]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});
 preview.classList.toggle('dark',theme==='dark');preview.classList.toggle('light',theme==='light');
 video.autoplay=shouldPlay;video.src=`assets/aquest-${theme}.mp4`;video.poster=`assets/aquest-${theme}.webp`;video.setAttribute('aria-label',`A Quest application animation in ${theme} theme`);full.href=video.src;video.load();if(shouldPlay)video.play().catch(()=>{});
}));
