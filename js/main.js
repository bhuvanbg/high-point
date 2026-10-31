// Replace with the lounge's real WhatsApp number (country code, no +)
var WA='919000000000';
document.querySelectorAll('.wa').forEach(function(a){a.href='https://wa.me/'+WA+'?text='+encodeURIComponent('Hi! I\u2019d like to reserve a table at The High Point Lounge.');a.target='_blank';a.rel='noopener'});

(function(){ // open now (IST), Fri/Sat run to 1 AM
 var d=new Date(new Date().toLocaleString('en-US',{timeZone:'Asia/Kolkata'})),h=d.getHours()+d.getMinutes()/60,w=d.getDay();
 var late=(w===5||w===6),prevLate=(w===6||w===0);
 var on=h>=12&&(h<23.5||(late&&h<24))||(h<1&&prevLate);
 var el=document.getElementById('open');el.textContent=on?'Open now':'Closed now, opens 12:00 PM';if(on)el.classList.add('on');
})();

var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var touch=matchMedia('(pointer: coarse)').matches;
if(window.gsap&&window.ScrollTrigger&&!reduce){
 gsap.registerPlugin(ScrollTrigger);
 if(window.Lenis){var lenis=new Lenis({lerp:.085,smoothWheel:true});lenis.on('scroll',ScrollTrigger.update);
  gsap.ticker.add(function(t){lenis.raf(t*1000)});gsap.ticker.lagSmoothing(0);
  document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var id=a.getAttribute('href');if(id.length>1){e.preventDefault();lenis.scrollTo(id)}})})}
 var spring='back.out(1.9)',elastic='elastic.out(1,.55)';

 // hero zoom-out and morph into a layered block
 var hs={trigger:'.hero',start:'top top',end:'bottom top',scrub:.6};
 gsap.fromTo('#stage',{scale:1.1,borderRadius:0},{scale:.95,borderRadius:32,ease:'none',scrollTrigger:hs});
 gsap.to('#dim',{opacity:.55,ease:'none',scrollTrigger:hs});
 gsap.to('#heroin',{y:-90,opacity:0,filter:'blur(10px)',ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'80% top',scrub:.6}});
 gsap.from('#heroin > *',{y:40,opacity:0,duration:1.4,ease:spring,stagger:.12,delay:.2});

 // vibe cards: 80px up, scale .85 to 1, fade, 100ms stagger
 ScrollTrigger.batch('.vibe',{start:'top 92%',once:true,
  onEnter:function(b){gsap.fromTo(b,{y:80,scale:.85,opacity:0},{y:0,scale:1,opacity:1,duration:1.1,ease:spring,stagger:.1,overwrite:true})}});
 gsap.set('.vibe',{opacity:0});

 // menu cards sweep in from the sides
 document.querySelectorAll('.mcard').forEach(function(c){
  gsap.from(c,{x:c.dataset.from*80,rotate:c.dataset.from*2,opacity:0,duration:1.2,ease:'back.out(1.25)',scrollTrigger:{trigger:c,start:'top 88%',toggleActions:'play none none reverse'}});
  var p=c.querySelector('.panel'),s=+p.dataset.speed;
  gsap.fromTo(p,{y:90,scale:.82},{y:-60*s,scale:1,ease:'none',scrollTrigger:{trigger:c,start:'top bottom',end:'bottom top',scrub:true}});
 });

 // events: blurred overlay to crisp, high contrast
 gsap.fromTo('.ev',{opacity:.15,filter:'blur(16px) brightness(.5)',y:40,scale:.94},{opacity:1,filter:'blur(0px) brightness(1.12)',y:0,scale:1,duration:1.3,ease:'back.out(1.4)',stagger:.12,scrollTrigger:{trigger:'#evgrid',start:'top 85%'}});

 // map and hours bounce down
 gsap.from('#foot > *',{y:-120,opacity:0,duration:1.6,ease:'bounce.out',stagger:.18,scrollTrigger:{trigger:'#foot',start:'top 85%'}});
}

// 3D tilt with neon glow (reduced on touch)
if(!reduce){var k=touch?7:14;
 document.querySelectorAll('.tilt').forEach(function(t){
  function mv(e){var r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
   t.style.transition='border-color .3s,box-shadow .3s';t.style.transform='rotateY('+x*k+'deg) rotateX('+-y*k+'deg) scale(1.03)'}
  function rs(){t.style.transition='transform .8s cubic-bezier(.34,1.8,.5,1),border-color .3s,box-shadow .3s';t.style.transform=''}
  t.addEventListener('pointermove',mv);t.addEventListener('pointerleave',rs);t.addEventListener('pointerup',rs);t.addEventListener('pointercancel',rs)})}
