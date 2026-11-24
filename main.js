(()=>{
'use strict';
const{CONFIG,PROJECTS,SKILLS,TIMELINE}=window.PORTFOLIO;
/* ---------- core ---------- */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const root=document.documentElement;
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const mqReduce=matchMedia('(prefers-reduced-motion: reduce)');
const S={calm:mqReduce.matches,u:16,t:0,fine:matchMedia('(hover:hover) and (pointer:fine)').matches};
const FONT='"Bricolage Grotesque","Arial Black",system-ui,sans-serif';
const readU=()=>{S.u=parseFloat(getComputedStyle(root).fontSize)||16};
readU();
const pal={};
const probe=document.createElement('span');
probe.style.cssText='position:absolute;visibility:hidden;pointer-events:none';
document.body.appendChild(probe);
function readPal(){for(const k of ['bg','panel','ink','acc','acc2','deep']){probe.style.color='var(--'+k+')';pal[k]=getComputedStyle(probe).color}}
readPal();
let palDirty=true;
const toastEl=$('#toast');let toastT=0;
function toast(m){toastEl.textContent=m;toastEl.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>toastEl.classList.remove('on'),2600)}
const pe=e=>({x:e.clientX,y:e.clientY});

/* ---------- generative art ---------- */
const ART={
  waves(c,w,h,t){
    c.fillStyle=pal.panel;c.fillRect(0,0,w,h);
    const cols=[pal.acc2,pal.acc,pal.ink,pal.acc2,pal.acc];
    for(let i=0;i<5;i++){
      const base=h*(0.3+i*0.14),amp=h*(0.05+i*0.008),f=7+i*1.6,sp=0.7+i*0.25;
      c.beginPath();c.moveTo(0,h);
      for(let x=0;x<=w+6;x+=6){const u=x/w;c.lineTo(x,base+Math.sin(u*f+t*sp+i*1.7)*amp+Math.sin(u*f*0.45-t*sp*0.6+i)*amp*0.7)}
      c.lineTo(w,h);c.closePath();c.globalAlpha=0.92-i*0.1;c.fillStyle=cols[i];c.fill();
    }
    c.globalAlpha=1;
  },
  orbits(c,w,h,t){
    c.fillStyle=pal.panel;c.fillRect(0,0,w,h);
    const m=Math.min(w,h);c.save();c.translate(w/2,h/2);c.rotate(-0.4);
    for(let i=0;i<6;i++){
      const r=m*(0.13+i*0.08);
      c.globalAlpha=0.35;c.strokeStyle=pal.ink;c.lineWidth=1;c.beginPath();c.ellipse(0,0,r,r*0.55,0,0,6.2832);c.stroke();
      const a=t*(1.1/(i+1)+0.25)+i*1.3;
      c.globalAlpha=1;c.fillStyle=i%2?pal.acc2:pal.acc;c.beginPath();c.arc(Math.cos(a)*r,Math.sin(a)*r*0.55,m*(0.02+0.005*(i%3)),0,6.2832);c.fill();
    }
    c.fillStyle=pal.ink;c.beginPath();c.arc(0,0,m*0.07,0,6.2832);c.fill();
    c.fillStyle=pal.acc;c.beginPath();c.arc(0,0,m*0.045,0,6.2832);c.fill();
    c.restore();
  },
  grid(c,w,h,t){
    c.fillStyle=pal.panel;c.fillRect(0,0,w,h);
    const n=9,cell=w/n,m=Math.min(w,h);
    for(let r=0;r<Math.ceil(h/cell);r++)for(let k=0;k<n;k++){
      const cx=(k+0.5)*cell,cy=(r+0.5)*cell,d=Math.hypot(cx-w/2,cy-h/2)/m;
      const s=0.5+0.5*Math.sin(d*9-t*2.2),sz=cell*0.84*(0.25+0.75*s);
      c.globalAlpha=0.35+0.65*s;c.fillStyle=s>0.7?pal.acc:(s>0.4?pal.acc2:pal.ink);c.fillRect(cx-sz/2,cy-sz/2,sz,sz);
    }
    c.globalAlpha=1;
  },
  blobs(c,w,h,t){
    c.fillStyle=pal.panel;c.fillRect(0,0,w,h);
    const m=Math.min(w,h),cols=[pal.acc,pal.acc2,pal.ink,pal.acc,pal.acc2];
    c.globalAlpha=0.7;
    for(let i=0;i<5;i++){
      const x=w/2+Math.sin(t*(0.5+i*0.17)+i*2)*w*0.28,y=h/2+Math.cos(t*(0.43+i*0.13)+i*1.3)*h*0.27,r=m*(0.3+0.04*i);
      const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,cols[i]);g.addColorStop(1,'rgba(0,0,0,0)');
      c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,6.2832);c.fill();
    }
    c.globalAlpha=1;
  },
  bars(c,w,h,t){
    c.fillStyle=pal.panel;c.fillRect(0,0,w,h);
    const m=Math.min(w,h),n=Math.max(8,Math.round(w/(m*0.05))),bw=w/n;
    for(let i=0;i<n;i++){
      const a=Math.abs(Math.sin(i*0.37+t*1.9)*Math.sin(i*0.11-t*0.8)),bh=h*(0.08+0.72*a);
      c.fillStyle=i%5===0?pal.acc2:(i%2?pal.acc:pal.ink);c.fillRect(i*bw+bw*0.15,(h-bh)/2,bw*0.7,bh);
    }
  },
  track(c,w,h,t){
    c.fillStyle=pal.panel;c.fillRect(0,0,w,h);
    const n=6,lh=h/(n+1),cols=[pal.acc,pal.acc2,pal.ink];
    for(let i=1;i<=n;i++){
      const y=i*lh;c.globalAlpha=0.4;c.strokeStyle=pal.ink;c.lineWidth=1;c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke();
      const x=(((t*(0.1+i*0.03)+i*0.19)%1.25)-0.1)*w;
      c.globalAlpha=0.35;c.fillStyle=cols[i%3];c.fillRect(x-lh*2.4,y-lh*0.05,lh*2.4,lh*0.1);
      c.globalAlpha=1;c.beginPath();c.arc(x,y,lh*0.3,0,6.2832);c.fill();
    }
    c.fillStyle=pal.ink;const fx=w*0.88,cs=lh*0.25;
    for(let k=0;k<Math.ceil(h/cs);k++){if(k%2===0)c.fillRect(fx,k*cs,cs,cs);else c.fillRect(fx+cs,k*cs,cs,cs)}
    c.globalAlpha=1;
  }
};
const Thumbs=(()=>{
  const items=[];
  function size(it){
    const r=it.box.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);
    it.w=Math.max(1,Math.round(r.width));it.h=Math.max(1,Math.round(r.height));
    it.cv.width=it.w*dpr;it.cv.height=it.h*dpr;it.c.setTransform(dpr,0,0,dpr,0,0);
  }
  const draw=(it,t)=>ART[it.mode](it.c,it.w,it.h,t);
  function add(cv,mode,idx,box){
    const it={cv,c:cv.getContext('2d'),mode,idx,box:box||cv.parentElement,w:1,h:1,live:false};
    items.push(it);
    new ResizeObserver(()=>{size(it);draw(it,2+idx*1.7)}).observe(it.box);
    return it;
  }
  return{add,
    redraw(){items.forEach(it=>draw(it,2+it.idx*1.7))},
    tick(){if(S.calm)return;items.forEach(it=>{if(it.live)draw(it,S.t+it.idx*1.7)})}};
})();

/* ---------- cards + modal ---------- */
const grid=$('#grid');
PROJECTS.forEach((p,i)=>{
  const b=document.createElement('button');b.type='button';b.className='card';b.dataset.i=i;
  b.innerHTML='<span class="thumb"><canvas></canvas></span><span class="meta mono"><span>0'+(i+1)+'</span><span>'+p.kind+'</span><span>'+p.tag+'</span></span><span class="name"><span>'+p.name+'</span><span class="arrow" aria-hidden="true">↗</span></span><span class="one">'+p.one+'</span>';
  const cell=document.createElement('div');cell.className='cell';cell.appendChild(b);grid.appendChild(cell);
  const it=Thumbs.add($('canvas',b),p.art,i);
  const on=()=>{it.live=true},off=()=>{it.live=false;b.style.setProperty('--rx','0deg');b.style.setProperty('--ry','0deg')};
  b.addEventListener('pointerenter',on);b.addEventListener('pointerleave',off);b.addEventListener('focus',on);b.addEventListener('blur',off);
  b.addEventListener('pointermove',e=>{
    const r=b.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
    b.style.setProperty('--mx',(px*100)+'%');b.style.setProperty('--my',(py*100)+'%');
    if(e.pointerType==='touch'||S.calm)return;
    b.style.setProperty('--rx',((0.5-py)*9).toFixed(2)+'deg');b.style.setProperty('--ry',((px-0.5)*11).toFixed(2)+'deg');
  });
  b.addEventListener('click',()=>Modal.open(i));
});
const Modal=(()=>{
  const el=$('#modal'),cv=$('#mCv'),c=cv.getContext('2d');
  let idx=0,isOpen=false,w=1,h=1,opener=null;
  function size(){const r=cv.parentElement.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);w=Math.max(1,Math.round(r.width));h=Math.max(1,Math.round(r.height));cv.width=w*dpr;cv.height=h*dpr;c.setTransform(dpr,0,0,dpr,0,0)}
  function fill(){
    const p=PROJECTS[idx];
    $('#mKind').textContent=p.kind;
    $('#mTitle').textContent=p.name;$('#mBlurb').textContent=p.blurb;
    $('#mTags').innerHTML=p.stack.map(s=>'<li>'+s+'</li>').join('');
    $('#mStats').innerHTML=p.stats.map(s=>'<div><dt>'+s[1]+'</dt><dd>'+s[0]+'</dd></div>').join('');
    $('#mLinks').innerHTML=(p.live?'<a class="btn" href="'+p.live+'" target="_blank" rel="noopener">Open live site ↗</a>':'')+(p.repo?'<a class="btn ghost" href="'+p.repo+'" target="_blank" rel="noopener">GitHub ↗</a>':'')+(p.soon&&!p.live?'<span class="mono" style="align-self:center;opacity:.85">Live link coming soon</span>':'');
    size();ART[p.art](c,w,h,3);
  }
  function open(i){opener=document.activeElement;idx=i;isOpen=true;el.classList.add('open');root.style.overflow='hidden';fill();$('#mClose').focus();}
  function close(){if(!isOpen)return;isOpen=false;el.classList.remove('open');root.style.overflow='';if(opener&&opener.focus)opener.focus()}
  const go=d=>{idx=(idx+d+PROJECTS.length)%PROJECTS.length;fill()};
  $('#mClose').addEventListener('click',close);
  $('#mPrev').addEventListener('click',()=>go(-1));$('#mNext').addEventListener('click',()=>go(1));
  el.addEventListener('pointerdown',e=>{if(e.target===el)close()});
  addEventListener('keydown',e=>{
    if(!isOpen)return;
    if(e.key==='Escape')close();
    else if(e.key==='ArrowRight')go(1);else if(e.key==='ArrowLeft')go(-1);
    else if(e.key==='Tab'){const f=$$('button',el);const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}
  });
  addEventListener('resize',()=>{if(isOpen)fill()});
  return{open,close,tick(){if(isOpen&&!S.calm)ART[PROJECTS[idx].art](c,w,h,S.t+3)}};
})();

/* ---------- hero particles ---------- */
const Hero=(()=>{
  const cv=$('#heroCv'),c=cv.getContext('2d');
  let W=0,H=0,parts=[],groups=[[],[],[]],size=3,R=80,settled=false,builtW=0;
  const ptr={x:-1e4,y:-1e4,on:false};
  function build(){
    const wrapW=Math.floor(cv.parentElement.clientWidth);
    if(wrapW<50)return;
    const oW=W,oH=H;
    builtW=wrapW;W=wrapW;
    const lines=CONFIG.name,off=document.createElement('canvas'),o=off.getContext('2d');
    o.font='800 200px '+FONT;
    const mw=Math.max(...lines.map(l=>o.measureText(l).width));
    let fs=200*W/mw*0.97;
    fs=Math.max(24,Math.min(fs,(innerHeight*0.66)/(lines.length*0.9)));
    const lh=fs*0.88;H=Math.ceil(lh*lines.length+fs*0.2);
    const dpr=Math.min(devicePixelRatio||1,2);
    cv.width=W*dpr;cv.height=H*dpr;cv.style.height=H+'px';c.setTransform(dpr,0,0,dpr,0,0);
    off.width=W;off.height=H;o.font='800 '+fs+'px '+FONT;o.textAlign='center';o.textBaseline='middle';o.fillStyle='#fff';
    lines.forEach((l,i)=>o.fillText(l,W/2,lh*(i+0.5)+fs*0.06));
    const d=o.getImageData(0,0,W,H).data,MAXP=innerWidth<700?2600:6500;
    let step=Math.max(2,Math.round(W/200)),pts;
    for(;;){
      pts=[];
      for(let y=0;y<H;y+=step)for(let x=0;x<W;x+=step)if(d[((y*W+x)<<2)+3]>128)pts.push(x,y);
      if(pts.length/2<=MAXP)break;step++;
    }
    size=Math.max(1.6,step*0.82);R=Math.max(44,Math.min(W*0.12,fs*0.55));
    /* reuse existing particles so a rebuild morphs smoothly instead of popping */
    const old=parts,n=pts.length/2;
    if(old.length&&oW&&oH){const sx=W/oW,sy=H/oH;for(const p of old){p.x*=sx;p.y*=sy}}
    parts=[];groups=[[],[],[]];
    for(let i=0;i<n;i++){
      let p=old[i];
      if(!p){const s=old.length?old[(Math.random()*old.length)|0]:null,r=Math.random();p={x:s?s.x:pts[i*2],y:s?s.y:pts[i*2+1],vx:0,vy:0,g:r<0.62?0:r<0.88?1:2}}
      p.hx=pts[i*2];p.hy=pts[i*2+1];parts.push(p);groups[p.g].push(p);
    }
    settled=false;
  }
  function shock(x,y){
    const rr=R*2.4;
    for(const p of parts){
      const dx=p.x-x,dy=p.y-y,d=Math.hypot(dx,dy)||1;
      if(d<rr){const f=(1-d/rr);p.vx+=dx/d*f*R*0.4+(Math.random()-0.5)*f*10;p.vy+=dy/d*f*R*0.4+(Math.random()-0.5)*f*10}
    }
    settled=false;
  }
  const local=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*(W/r.width),(e.clientY-r.top)*(H/r.height)]};
  cv.addEventListener('pointermove',e=>{[ptr.x,ptr.y]=local(e);ptr.on=true;settled=false});
  cv.addEventListener('pointerleave',()=>{ptr.on=false});
  cv.addEventListener('pointercancel',()=>{ptr.on=false});
  cv.addEventListener('pointerup',e=>{if(e.pointerType==='touch')ptr.on=false});
  cv.addEventListener('pointerdown',e=>{const[x,y]=local(e);ptr.x=x;ptr.y=y;if(!S.calm)shock(x,y)});
  let vis=true;new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis)settled=false}).observe(cv);
  function tick(dt){
    if(!vis||!parts.length)return;
    if(settled&&!ptr.on)return;
    const k=Math.min(2,dt*60),on=ptr.on&&!S.calm,R2=R*R;
    let moving=false;
    for(const p of parts){
      let ax=(p.hx-p.x)*0.075*k,ay=(p.hy-p.y)*0.075*k;
      if(on){
        const dx=p.x-ptr.x,dy=p.y-ptr.y,d2=dx*dx+dy*dy;
        if(d2<R2){const d=Math.sqrt(d2)||1,f=1-d/R,pf=f*f*R*0.1*k;ax+=dx/d*pf;ay+=dy/d*pf}
      }
      p.vx=(p.vx+ax)*(1-0.16*k);p.vy=(p.vy+ay)*(1-0.16*k);
      p.x+=p.vx*k;p.y+=p.vy*k;
      if(Math.abs(p.vx)<0.02&&Math.abs(p.vy)<0.02&&Math.abs(p.hx-p.x)<0.08&&Math.abs(p.hy-p.y)<0.08){p.x=p.hx;p.y=p.hy;p.vx=p.vy=0}else moving=true;
    }
    draw();
    if(!moving&&!ptr.on)settled=true;
  }
  function draw(){
    c.clearRect(0,0,W,H);
    const cols=[pal.ink,pal.acc,pal.acc2];
    for(let g=0;g<3;g++){c.fillStyle=cols[g];for(const p of groups[g])c.fillRect(p.x-size/2,p.y-size/2,size,size)}
  }
  return{build,tick,
    dirty(){settled=false;if(parts.length&&!ptr.on)draw()},
    needsBuild(){return Math.floor(cv.parentElement.clientWidth)!==builtW},
    shockAt:shock};
})();

/* ---------- headline word roll (all words share one grid cell, so nothing reflows) ---------- */
const Scr=(()=>{
  const words=$$('#word .wd');let i=0,timer=0,busy=false;
  return{tick(dt){
    if(S.calm||words.length<2||busy)return;
    timer+=dt;if(timer<2.6)return;
    timer=0;busy=true;
    const cur=words[i];i=(i+1)%words.length;const nxt=words[i];
    cur.classList.remove('on');cur.classList.add('out');cur.setAttribute('aria-hidden','true');
    nxt.classList.add('on');nxt.removeAttribute('aria-hidden');
    setTimeout(()=>{cur.style.transition='none';cur.classList.remove('out');void cur.offsetHeight;cur.style.transition='';busy=false},760);
  }};
})();

/* ---------- marquee ---------- */
const Marq=(()=>{
  const rows=$$('.mq').map(el=>{const track=$('.mq-track',el);return{el,track,seq:$('.mq-seq',track),x:0,dir:el.dataset.dir==='r'?1:-1,sw:1}});
  let sy=scrollY,vel=0;
  function layout(){
    rows.forEach(r=>{
      while(r.track.children.length>1)r.track.lastChild.remove();
      r.sw=Math.max(1,r.seq.getBoundingClientRect().width);
      const need=Math.ceil((r.el.clientWidth*2)/r.sw)+1;
      for(let i=0;i<need;i++){const cl=r.seq.cloneNode(true);r.track.appendChild(cl)}
      r.x=r.dir>0?-r.sw*0.4:0;
    });
  }
  rows.forEach(r=>new ResizeObserver(layout).observe(r.el));
  return{layout,tick(dt){
    const ny=scrollY;vel+=(((ny-sy)/Math.max(dt,0.001))-vel)*0.12;sy=ny;
    const base=S.calm?0:55*S.u/14,boost=S.calm?0:clamp(vel*0.7,-2200,2200);
    rows.forEach(r=>{
      r.x+=r.dir*(base+boost)*dt;
      if(r.x<-r.sw)r.x+=r.sw;if(r.x>0)r.x-=r.sw;
      r.track.style.transform='translate3d('+r.x.toFixed(1)+'px,0,0)';
    });
  }};
})();

/* ---------- skill pit ---------- */
const Pit=(()=>{
  const cv=$('#pitCv'),c=cv.getContext('2d'),box=$('#pitBox'),out=$('#readout'),gBtn=$('#gBtn');
  const MODES=['down','up','off','center'];
  let W=1,H=1,dpr=1,mode=0,vis=false,balls=[],drag=null,hover=-1,down=null,sized=false;
  const E=0.45;
  function baseR(){return clamp(Math.min(W,H)*0.085,S.u*1.5,S.u*3.6)}
  function radii(){const b=baseR();balls.forEach((o,i)=>{o.r=b*(0.92+0.07*Math.min(SKILLS[i][0].length,5));o.m=o.r*o.r})}
  function size(){
    const nw=Math.max(1,box.clientWidth),nh=Math.max(1,box.clientHeight);dpr=Math.min(devicePixelRatio||1,2);
    if(sized&&(nw!==W||nh!==H)){balls.forEach(o=>{o.x*=nw/W;o.y*=nh/H})}
    W=nw;H=nh;cv.width=W*dpr;cv.height=H*dpr;c.setTransform(dpr,0,0,dpr,0,0);
    radii();balls.forEach(o=>{o.x=clamp(o.x,o.r,W-o.r);o.y=clamp(o.y,o.r,H-o.r)});sized=true;
  }
  function spawn(){
    balls=SKILLS.map((s,i)=>({i,x:0,y:0,vx:0,vy:0,r:20,m:400,pulse:0}));
    radii();
    balls.forEach((o,k)=>{o.x=o.r+Math.random()*(W-2*o.r);o.y=-o.r*(1+k*1.2)*0.6+o.r;o.vx=(Math.random()-0.5)*200;o.vy=0});
  }
  const G=()=>1900*S.u/14;
  function step(dt){
    const g=MODES[mode];
    for(const o of balls){
      if(o===drag)continue;
      if(g==='down')o.vy+=G()*dt;else if(g==='up')o.vy-=G()*dt;
      else if(g==='center'){o.vx+=(W/2-o.x)*5*dt;o.vy+=(H/2-o.y)*5*dt}
      const damp=1/(1+(g==='off'?0.12:g==='center'?1.4:0.05)*dt);o.vx*=damp;o.vy*=damp;
      o.x+=o.vx*dt;o.y+=o.vy*dt;
    }
    for(const o of balls){
      if(o.x<o.r){o.x=o.r;o.vx=Math.abs(o.vx)*E}else if(o.x>W-o.r){o.x=W-o.r;o.vx=-Math.abs(o.vx)*E}
      if(o.y<o.r){o.y=o.r;o.vy=Math.abs(o.vy)*E}else if(o.y>H-o.r){o.y=H-o.r;o.vy=-Math.abs(o.vy)*E;if(Math.abs(o.vy)<30)o.vy=0}
    }
    for(let it=0;it<3;it++)for(let a=0;a<balls.length;a++)for(let b=a+1;b<balls.length;b++){
      const p=balls[a],q=balls[b],dx=q.x-p.x,dy=q.y-p.y,md=p.r+q.r,d2=dx*dx+dy*dy;
      if(d2>=md*md||d2===0)continue;
      const d=Math.sqrt(d2),nx=dx/d,ny=dy/d,ov=md-d,ip=p===drag?0:1/p.m,iq=q===drag?0:1/q.m,tot=ip+iq;
      if(!tot)continue;
      p.x-=nx*ov*ip/tot;p.y-=ny*ov*ip/tot;q.x+=nx*ov*iq/tot;q.y+=ny*ov*iq/tot;
      const vn=(q.vx-p.vx)*nx+(q.vy-p.vy)*ny;
      if(vn<0){const j=-(1+E)*vn/tot;p.vx-=j*ip*nx;p.vy-=j*ip*ny;q.vx+=j*iq*nx;q.vy+=j*iq*ny}
    }
    for(const o of balls){o.pulse*=Math.pow(0.02,dt)}
  }
  function pos(e){const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*(W/r.width),(e.clientY-r.top)*(H/r.height)]}
  function hit(x,y){for(let k=balls.length-1;k>=0;k--){const o=balls[k];if(Math.hypot(o.x-x,o.y-y)<=o.r+5)return o}return null}
  function show(o){out.innerHTML='<strong>'+SKILLS[o.i][1]+'.</strong> '+SKILLS[o.i][2]}
  cv.addEventListener('pointerdown',e=>{
    const[x,y]=pos(e),o=hit(x,y);if(!o)return;
    cv.setPointerCapture(e.pointerId);drag=o;down={x,y,t:performance.now(),moved:false,tx:x,ty:y,dx:o.x-x,dy:o.y-y};
    balls.splice(balls.indexOf(o),1);balls.push(o);show(o);e.preventDefault();
  });
  cv.addEventListener('pointermove',e=>{
    const[x,y]=pos(e);
    if(drag){down.tx=x;down.ty=y;if(Math.hypot(x-down.x,y-down.y)>6)down.moved=true;return}
    const o=hit(x,y);hover=o?o.i:-1;cv.style.cursor=o?'grab':'';
    if(o&&!S.fine)show(o);else if(o)show(o);
  });
  const release=()=>{
    if(!drag)return;const o=drag;drag=null;
    if(down&&!down.moved){o.pulse=1;o.vy-=700*S.u/14}
    down=null;
  };
  cv.addEventListener('pointerup',release);cv.addEventListener('pointercancel',release);
  cv.addEventListener('pointerleave',()=>{if(!drag){hover=-1}});
  gBtn.addEventListener('click',()=>{mode=(mode+1)%MODES.length;gBtn.textContent='Gravity: '+MODES[mode];toast(gBtn.textContent);balls.forEach(o=>{o.vy+=(Math.random()-0.5)*300})});
  $('#shake').addEventListener('click',()=>{balls.forEach(o=>{o.vx+=(Math.random()-0.5)*2200*S.u/14;o.vy-=Math.random()*1800*S.u/14})});
  $('#drop').addEventListener('click',()=>{mode=0;gBtn.textContent='Gravity: down';spawn()});
  new IntersectionObserver(es=>{vis=es[0].isIntersecting}).observe(box);
  new ResizeObserver(()=>{size()}).observe(box);
  function draw(){
    c.clearRect(0,0,W,H);
    const fills=[pal.acc,pal.acc2,pal.ink,null];
    for(const o of balls){
      const f=fills[o.i%4],r=o.r*(1+0.14*o.pulse),active=o===drag||o.i===hover;
      c.beginPath();c.arc(o.x,o.y,r,0,6.2832);
      if(f){c.fillStyle=active?pal.ink:f;c.fill()}else{c.fillStyle=active?pal.ink:pal.bg;c.fill();c.lineWidth=2;c.strokeStyle=pal.ink;c.stroke()}
      const txtCol=(f||active)?pal.deep:pal.ink;
      let fs=r*0.62;c.font='800 '+fs+'px '+FONT;
      const tw=c.measureText(SKILLS[o.i][0]).width;if(tw>r*1.55){fs*=r*1.55/tw;c.font='800 '+fs+'px '+FONT}
      c.fillStyle=txtCol;c.textAlign='center';c.textBaseline='middle';c.fillText(SKILLS[o.i][0],o.x,o.y+fs*0.04);
    }
  }
  function init(){
    size();spawn();
    for(let k=0;k<420;k++)step(1/120);
    balls.forEach(o=>{o.vx=o.vy=0});
    draw();
  }
  return{init,tick(dt){
    if(!vis)return;
    if(drag&&down){
      const o=drag,tx=down.tx+down.dx,ty=down.ty+down.dy,k=Math.min(1,dt*28),nx=clamp(o.x+(tx-o.x)*k,o.r,W-o.r),ny=clamp(o.y+(ty-o.y)*k,o.r,H-o.r),L=3200*S.u/14;
      o.vx=clamp((nx-o.x)/Math.max(dt,0.001),-L,L);o.vy=clamp((ny-o.y)/Math.max(dt,0.001),-L,L);o.x=nx;o.y=ny;
    }
    const n=Math.max(1,Math.ceil(dt/(1/90)));for(let k=0;k<n;k++)step(dt/n);
    draw();
  }};
})();

/* ---------- about: timeline + counters ---------- */
(()=>{
  const tl=$('#tl');
  TIMELINE.forEach((r,i)=>{
    const li=document.createElement('li'),id='tl'+i;
    li.innerHTML='<button type="button" aria-expanded="'+(i===0)+'" aria-controls="'+id+'"><span class="yr">'+r[0]+'</span><span class="t">'+r[1]+'</span><span class="pm" aria-hidden="true">+</span></button><div class="more" id="'+id+'"><div><p>'+r[2]+'</p></div></div>';
    tl.appendChild(li);
    $('button',li).addEventListener('click',e=>{const b=e.currentTarget;b.setAttribute('aria-expanded',String(b.getAttribute('aria-expanded')!=='true'))});
  });
  const io=new IntersectionObserver(es=>es.forEach(en=>{
    if(!en.isIntersecting)return;io.unobserve(en.target);
    const el=en.target,to=+el.dataset.to;if(S.calm)return;
    const t0=performance.now(),dur=1300;
    (function f(now){const p=clamp((now-t0)/dur,0,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(to*e);if(p<1)requestAnimationFrame(f)})(t0);
  }),{threshold:0.8});
  $$('.big[data-to]').forEach(el=>io.observe(el));
})();

/* ---------- hue knob + modes ---------- */
const Tune=(()=>{
  const knob=$('#knob'),out=$('#hueOut'),chips=$$('#chips .chip');
  /* dial angle: 0-300 maps to hue 0-360, 300-330 is white, 330-360 is black */
  let angle=315,hue=178,tone='white',disco=false,dragging=false;
  function set(a,save){
    angle=((a%360)+360)%360;
    if(angle<300){tone='color';hue=angle*1.2}else tone=angle<330?'white':'black';
    root.dataset.tone=tone;root.style.setProperty('--h',hue.toFixed(1));
    knob.style.setProperty('--rot',angle.toFixed(1)+'deg');
    const label=tone==='color'?Math.round(hue)+'°':(tone==='white'?'White':'Black');
    out.textContent=label;knob.setAttribute('aria-valuenow',String(Math.round(angle)));knob.setAttribute('aria-valuetext',label);
    palDirty=true;
    if(save){try{localStorage.setItem('jm-dial2',String(Math.round(angle)))}catch(e){}}
    chips.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.tone?tone===b.dataset.tone:(tone==='color'&&Math.abs(+b.dataset.h-hue)<2))));
  }
  const ang=e=>{const r=knob.getBoundingClientRect();return(Math.atan2(e.clientX-(r.left+r.width/2),-(e.clientY-(r.top+r.height/2)))*180/Math.PI+360)%360};
  knob.addEventListener('pointerdown',e=>{knob.setPointerCapture(e.pointerId);dragging=true;setDisco(false);set(ang(e),true);knob.focus({preventScroll:true});e.preventDefault()});
  knob.addEventListener('pointermove',e=>{if(dragging)set(ang(e),true)});
  const stop=()=>{dragging=false};knob.addEventListener('pointerup',stop);knob.addEventListener('pointercancel',stop);
  knob.addEventListener('keydown',e=>{
    const k=e.key;let d=0;
    if(k==='ArrowRight'||k==='ArrowUp')d=e.shiftKey?15:3;else if(k==='ArrowLeft'||k==='ArrowDown')d=e.shiftKey?-15:-3;
    else if(k==='PageUp')d=15;else if(k==='PageDown')d=-15;
    else if(k==='Home'){e.preventDefault();setDisco(false);set(0,true);return}else if(k==='End'){e.preventDefault();setDisco(false);set(345,true);return}
    if(d){e.preventDefault();setDisco(false);set(angle+d,true)}
  });
  chips.forEach(b=>b.addEventListener('click',()=>{
    setDisco(false);
    if(b.dataset.tone)set(b.dataset.tone==='white'?315:345,true);else set(+b.dataset.h/1.2,true);
  }));
  const dBtn=$('#disco');
  function setDisco(v){disco=v;dBtn.setAttribute('aria-pressed',String(v))}
  dBtn.addEventListener('click',()=>{setDisco(!disco);toast(disco?'Auto-cycle on':'Auto-cycle off')});
  const cBtn=$('#calm');
  function setCalm(v){S.calm=v;if(v)GS.calm();root.classList.toggle('calm',v);cBtn.setAttribute('aria-pressed',String(v));Cur.refresh();Hero.dirty()}
  cBtn.addEventListener('click',()=>{setCalm(!S.calm);toast(S.calm?'Calm mode on':'Calm mode off')});
  let saved=null;try{saved=localStorage.getItem('jm-dial2')}catch(e){}
  set(saved!==null&&!isNaN(+saved)?+saved:315,false);
  if(S.calm){root.classList.add('calm');cBtn.setAttribute('aria-pressed','true')}
  let seq=[];const code=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  addEventListener('keydown',e=>{
    seq.push(e.key.length===1?e.key.toLowerCase():e.key);seq=seq.slice(-code.length);
    if(seq.join()===code.join()){setDisco(!disco);toast(disco?'Disco mode on':'Disco mode off')}
  });
  return{tick(dt){if(disco&&!dragging){let a=(tone==='color'?angle:0)+dt*32;if(a>=300)a=0;set(a,false)}}};
})();

/* ---------- fx trail + bursts ---------- */
const FX=(()=>{
  const cv=$('#fx'),c=cv.getContext('2d'),ps=[];let W=0,H=0,dirty=false;
  const size=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight};size();addEventListener('resize',size);
  function spawn(x,y,n,spd,life){
    for(let i=0;i<n;i++){
      if(ps.length>360)ps.shift();
      const a=Math.random()*6.2832,s=spd*(0.3+Math.random());
      ps.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:life*(0.6+Math.random()*0.6),m:life,c:Math.floor(Math.random()*3),s:(2+Math.random()*3.5)*S.u/14});
    }
  }
  addEventListener('pointermove',e=>{if(S.calm||e.pointerType==='touch')return;spawn(e.clientX,e.clientY,1,90,0.7)},{passive:true});
  addEventListener('pointerdown',e=>{if(S.calm)return;spawn(e.clientX,e.clientY,16,420,0.9)},{passive:true});
  return{tick(dt){
    if(!ps.length){if(dirty){c.clearRect(0,0,W,H);dirty=false}return}
    dirty=true;c.clearRect(0,0,W,H);const cols=[pal.acc,pal.acc2,pal.ink];
    for(let i=ps.length-1;i>=0;i--){
      const p=ps[i];p.l-=dt;if(p.l<=0){ps.splice(i,1);continue}
      const dmp=Math.pow(0.05,dt);p.vx*=dmp;p.vy=p.vy*dmp+160*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;
      const k=p.l/p.m,s=p.s*(0.4+0.6*k);c.globalAlpha=Math.min(1,k*1.5);c.fillStyle=cols[p.c];c.fillRect(p.x-s/2,p.y-s/2,s,s);
    }
    c.globalAlpha=1;
  }};
})();

/* ---------- custom cursor + magnetic buttons ---------- */
const Cur=(()=>{
  const dot=$('#curDot'),ring=$('#curRing');let x=-100,y=-100,rx=-100,ry=-100;
  let seen=false;
  function refresh(){root.classList.toggle('has-cursor',S.fine&&!S.calm&&seen)}
  addEventListener('pointermove',e=>{
    if(e.pointerType==='touch')return;x=e.clientX;y=e.clientY;if(!seen){seen=true;rx=x;ry=y;refresh()}
    const t=e.target&&e.target.closest?e.target.closest('a,button,[role=slider],canvas#pitCv,.card'):null;
    ring.classList.toggle('big',!!t&&!S.calm);
  },{passive:true});
  document.addEventListener('pointerleave',()=>{x=y=rx=ry=-100});
  refresh();
  /* magnetic buttons */
  $$('[data-magnet]').forEach(b=>{
    b.addEventListener('pointermove',e=>{if(S.calm||e.pointerType==='touch')return;const r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*0.22).toFixed(1)+'px,'+((e.clientY-r.top-r.height/2)*0.32).toFixed(1)+'px)'});
    b.addEventListener('pointerleave',()=>{b.style.transform=''});
  });
  return{refresh,tick(){rx+=(x-rx)*0.22;ry+=(y-ry)*0.22;dot.style.transform='translate3d('+x+'px,'+y+'px,0)';ring.style.transform='translate3d('+rx.toFixed(1)+'px,'+ry.toFixed(1)+'px,0)'}};
})();

/* ---------- magnetic letters ---------- */
(()=>{
  const el=$('#helloH'),txt=el.textContent;el.setAttribute('aria-label',txt);el.textContent='';
  const sp=[...txt].map(ch=>{const s=document.createElement('span');s.className='ch';s.setAttribute('aria-hidden','true');s.textContent=ch===' '?' ':ch;el.appendChild(s);return s});
  const reset=()=>sp.forEach(s=>{s.style.transform=''});
  addEventListener('pointermove',e=>{
    if(S.calm||e.pointerType==='touch')return;
    const R=Math.max(130,S.u*11);let any=false;
    sp.forEach(s=>{
      const r=s.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,dx=cx-e.clientX,dy=cy-e.clientY,d=Math.hypot(dx,dy);
      if(d<R&&r.bottom>0&&r.top<innerHeight){const f=1-d/R;s.style.transform='translate('+(dx/(d||1)*f*R*0.55).toFixed(1)+'px,'+(dy/(d||1)*f*R*0.55).toFixed(1)+'px) rotate('+(dx/(d||1)*f*40).toFixed(1)+'deg)';any=true}
      else s.style.transform='';
    });
  },{passive:true});
  el.addEventListener('pointerdown',()=>{if(S.calm)return;sp.forEach(s=>{s.style.transform='translate('+((Math.random()-0.5)*160).toFixed(0)+'px,'+((Math.random()-0.5)*120).toFixed(0)+'px) rotate('+((Math.random()-0.5)*120).toFixed(0)+'deg)'});setTimeout(reset,650)});
  document.addEventListener('pointerleave',reset);
})();

/* ---------- compose ---------- */
(()=>{
  const n=$('#fName'),m=$('#fMsg'),d=$('#draft'),st=$('#status'),btn=$('#copyBtn');
  function upd(){d.value=(CONFIG.email?'To: '+CONFIG.email+'\n':'')+'Subject: Hello from '+(n.value.trim()||'a friendly stranger')+'\n\n'+(m.value.trim()||'Hi Joy,\n\nI saw your portfolio and I would like to talk about...')+'\n\n'+(n.value.trim()||'')}
  n.addEventListener('input',upd);m.addEventListener('input',upd);upd();
  $('#form').addEventListener('submit',async e=>{
    e.preventDefault();let ok=false;
    try{await navigator.clipboard.writeText(d.value);ok=true}catch(err){}
    if(ok){st.textContent=CONFIG.email?'Copied. Paste it into your email app and send it to '+CONFIG.email+'.':'Copied. Paste it into your email app and send it to Joy.';toast('Draft copied');btn.textContent='Copied ✓';setTimeout(()=>{btn.textContent='Copy as email draft'},2200)}
    else{d.focus();d.select();st.textContent='Your browser blocked copying. The draft is selected: press Ctrl or Cmd + C.'}
  });
})();

/* ---------- HUD, progress, nav, loop ---------- */
const HUD=(()=>{
  const t=$('#hTime'),w=$('#hWin'),p=$('#hPtr'),s=$('#hScr'),bar=$('#bar'),ft=$('#fTime');
  let px=null,py=null,lastSec=-1,start=performance.now(),lastPct=-1;
  addEventListener('pointermove',e=>{px=e.clientX|0;py=e.clientY|0},{passive:true});
  const win=()=>{w.textContent=innerWidth+' × '+innerHeight};win();addEventListener('resize',win);
  let lastP='';
  return{tick(){
    const d=new Date(),sec=d.getSeconds();
    if(sec!==lastSec){lastSec=sec;t.textContent=d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});ft.textContent='On this page: '+Math.floor((performance.now()-start)/1000)+'s'}
    const max=Math.max(1,root.scrollHeight-innerHeight),f=clamp(scrollY/max,0,1),pct=Math.round(f*100);
    if(pct!==lastPct){lastPct=pct;s.textContent=pct+'%';bar.style.transform='scaleX('+f.toFixed(3)+')'}
    const pv=px===null?'move your cursor':px+', '+py;if(pv!==lastP){lastP=pv;p.textContent=pv}
  }};
})();
(()=>{
  const links=$$('.nav a.l'),map=new Map();links.forEach(a=>map.set(a.getAttribute('href').slice(1),a));
  const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){links.forEach(a=>a.removeAttribute('aria-current'));const a=map.get(en.target.id);if(a)a.setAttribute('aria-current','true')}}),{rootMargin:'-45% 0px -50% 0px'});
  map.forEach((a,id)=>{const s=document.getElementById(id);if(s)io.observe(s)});
})();

/* ---------- GSAP (loads from cdnjs, page works without it) ---------- */
const GS=(()=>{
  const ok=!!(window.gsap&&window.ScrollTrigger);let spin=null,live=false;
  const safe=fn=>{try{fn()}catch(e){}};
  function init(){
    if(!ok||S.calm){root.classList.add('ready');return}
    safe(()=>{gsap.registerPlugin(ScrollTrigger);live=true});
    if(!live){root.classList.add('ready');return}
    const badge=$('#badge');
    safe(()=>{
      const tl=gsap.timeline({defaults:{ease:'power3.out'}});
      tl.from('.kick span',{y:-18,opacity:0,duration:.6,stagger:.1,clearProps:'transform,opacity'})
        .from('#portrait',{scale:.82,rotate:-8,opacity:0,duration:1.1,ease:'elastic.out(1,.65)',clearProps:'transform,opacity'},0.1)
        .from('.say',{y:40,opacity:0,duration:.8,clearProps:'transform,opacity'},0.3)
        .from('.intro .lede',{y:24,opacity:0,duration:.7,clearProps:'transform,opacity'},0.5)
        .from('.cta .btn',{scale:.8,opacity:0,duration:.6,stagger:.12,ease:'back.out(1.7)',clearProps:'transform,opacity'},0.6);
    });
    root.classList.add('ready');
    safe(()=>gsap.to('#phImg',{yPercent:-4,ease:'none',scrollTrigger:{trigger:'#portrait',start:'top bottom',end:'bottom top',scrub:true}}));
    safe(()=>gsap.utils.toArray('.sec-h h2').forEach(h=>gsap.fromTo(h,{x:-50},{x:0,ease:'none',scrollTrigger:{trigger:h,start:'top 100%',end:'top 60%',scrub:0.6}})));
    safe(()=>gsap.from('#grid .cell',{y:80,rotate:i=>(i%2?4:-4),duration:.9,ease:'back.out(1.5)',stagger:.12,immediateRender:false,clearProps:'transform',scrollTrigger:{trigger:'#grid',start:'top 85%',once:true}}));
    safe(()=>gsap.from('#tl li',{x:-40,duration:.7,stagger:.1,ease:'power2.out',immediateRender:false,clearProps:'transform',scrollTrigger:{trigger:'#tl',start:'top 88%',once:true}}));
    safe(()=>gsap.fromTo('#pitBox',{scale:.94},{scale:1,ease:'none',scrollTrigger:{trigger:'#pitBox',start:'top 100%',end:'top 55%',scrub:true}}));
    if(badge)safe(()=>{
      badge.style.animation='none';
      spin=gsap.to(badge,{rotation:360,duration:14,ease:'none',repeat:-1});
      ScrollTrigger.create({start:0,end:'max',onUpdate:self=>{spin.timeScale(1+Math.min(Math.abs(self.getVelocity())/250,12));gsap.to(spin,{timeScale:1,duration:1.2,overwrite:true})}});
    });
  }
  return{init,
    refresh(){if(live)safe(()=>ScrollTrigger.refresh())},
    pop(){if(live&&!S.calm)safe(()=>gsap.fromTo('#badge',{scale:1.3},{scale:1,duration:.9,ease:'elastic.out(1,.4)',overwrite:'auto'}))},
    calm(){
      if(!live)return;
      safe(()=>{ScrollTrigger.getAll().forEach(st=>{if(st.animation)st.animation.progress(1);st.kill()});if(spin)spin.pause()});
    }};
})();
(()=>{
  const f=$('#frame');
  f.addEventListener('pointermove',e=>{
    if(e.pointerType==='touch'||S.calm)return;
    const r=f.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-0.5,py=(e.clientY-r.top)/r.height-0.5;
    f.style.setProperty('--rx',(-py*10).toFixed(2)+'deg');f.style.setProperty('--ry',(px*12).toFixed(2)+'deg');
    f.style.setProperty('--tx',(px*-4).toFixed(2)+'%');f.style.setProperty('--ty',(py*-3).toFixed(2)+'%');
  });
  f.addEventListener('pointerleave',()=>{['--rx','--ry','--tx','--ty'].forEach(k=>f.style.removeProperty(k))});
  f.addEventListener('click',()=>{GS.pop();toast('Hi, I am Joy')});
})();

let last=performance.now();
function frame(now){
  const dt=Math.min(0.05,Math.max(0.001,(now-last)/1000));last=now;S.t+=dt;
  if(palDirty){palDirty=false;readPal();Thumbs.redraw();Hero.dirty()}
  Tune.tick(dt);Hero.tick(dt);Scr.tick(dt);Marq.tick(dt);Pit.tick(dt);Thumbs.tick();Modal.tick();FX.tick(dt);Cur.tick();HUD.tick();
  requestAnimationFrame(frame);
}
Pit.init();
readU();Hero.build();
GS.init();
const fontReady=Promise.race([document.fonts?document.fonts.load('800 100px "Bricolage Grotesque"'):Promise.resolve(),new Promise(r=>setTimeout(r,1800))]);
fontReady.then(()=>{readU();Hero.build();Marq.layout();GS.refresh()});
let rz=0;
addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(()=>{readU();if(Hero.needsBuild())Hero.build()},120)});
new ResizeObserver(()=>{if(Hero.needsBuild())Hero.build()}).observe($('.stage'));
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{Marq.layout()});
requestAnimationFrame(frame);
})();
