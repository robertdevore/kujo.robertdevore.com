(() => {
  'use strict';
  const key = 'kujo-course-progress-v1';
  let completed = new Set();
  let storageWorks = true;
  try {
    const stored = JSON.parse(localStorage.getItem(key) || '[]');
    if (Array.isArray(stored)) completed = new Set(stored.filter(x => typeof x === 'string'));
  } catch { storageWorks = false; }
  const buttons = [...document.querySelectorAll('[data-complete]')];
  const renderProgress = () => {
    document.querySelectorAll('[data-lesson]').forEach(a => a.classList.toggle('done', completed.has(a.dataset.lesson)));
    buttons.forEach(b => { const done = completed.has(b.dataset.complete); b.textContent = done ? '✓ Completed · mark incomplete' : 'Mark complete'; b.setAttribute('aria-pressed', String(done)); });
    document.querySelectorAll('[data-progress-label]').forEach(el => el.textContent = `${Math.min(completed.size,47)} / 47 complete`);
    document.querySelectorAll('[data-progress]').forEach(el => el.value = Math.min(completed.size,47));
    document.querySelectorAll('[data-stage-progress]').forEach(el => {const links=[...document.querySelectorAll(`[data-stage="${el.dataset.stageProgress}"]`)];el.textContent=`${links.filter(a=>completed.has(a.dataset.lesson)).length} / ${links.length} lessons complete`;});
    const resume=document.querySelector('[data-resume]');
    if(resume && completed.size){const next=[...document.querySelectorAll('.stage [data-lesson]')].find(a=>!completed.has(a.dataset.lesson));if(next){resume.href=next.href;resume.textContent='Continue learning →';}else{resume.href='/capstone/';resume.textContent='Continue to the capstone →';}}
  };
  buttons.forEach(b => b.addEventListener('click', () => {
    const id=b.dataset.complete; completed.has(id)?completed.delete(id):completed.add(id);
    try {localStorage.setItem(key,JSON.stringify([...completed]));}catch{storageWorks=false;}
    renderProgress();
    document.querySelectorAll('[data-complete-status]').forEach(el=>el.textContent=storageWorks?'Saved in this browser.':'Progress works for this page; browser storage is unavailable.');
  }));
  renderProgress();
  document.querySelectorAll('.sidebar a').forEach(a=>{if(a.pathname===location.pathname){a.setAttribute('aria-current','page');if(innerWidth>720)a.closest('details')?.setAttribute('open','');}});
  const search=document.querySelector('#search'), results=document.querySelector('#search-results');
  let indexPromise;
  const loadIndex=()=>indexPromise ||= fetch('/assets/course-search.json').then(r=>{if(!r.ok)throw Error('search');return r.json();});
  let queryVersion=0;
  search?.addEventListener('input',async()=>{
    const version=++queryVersion, query=search.value.trim().toLowerCase();results.replaceChildren();results.hidden=!query;if(!query)return;
    try{const data=await loadIndex();if(version!==queryVersion)return;const words=query.replaceAll('machine readable','machine-readable').split(/\s+/).filter(w=>!['vs','versus'].includes(w));const matches=data.map(x=>({...x,rank:words.reduce((n,w)=>n+(x.title.toLowerCase().includes(w)?5:x.text.toLowerCase().includes(w)?1:0),0)})).filter(x=>words.every(w=>(x.title+' '+x.text).toLowerCase().includes(w))).sort((a,b)=>b.rank-a.rank).slice(0,12);const p=document.createElement('p');p.textContent=matches.length?`${matches.length} matching lessons and builds`:'No matches. Try “truthiness”, “replay”, or “capabilities”.';results.append(p);for(const row of matches){const a=document.createElement('a');a.href=row.url;a.textContent=row.title;results.append(a);}}
    catch{results.textContent='Search could not load. Browse the curriculum links instead.';indexPromise=null;}
  });
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&results){results.hidden=true;search?.focus();}});
  document.addEventListener('click',event=>{if(results&&!results.contains(event.target)&&event.target!==search)results.hidden=true;});
  const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  function highlight(code){const raw=code.textContent;const pattern=/(#[^\n]*|\/\/[^\n]*|"(?:\\.|[^"\\])*"|\b(?:func|export|let|mut|const|if|else|for|in|while|loop|return|break|continue|match|case|default|try|except|throw|async|await|spawn|struct|enum|true|false|null|test|test_group|test_setup|test_teardown)\b)/g;let last=0,html='';for(const m of raw.matchAll(pattern)){html+=escape(raw.slice(last,m.index));const type=m[0].startsWith('"')?'string':m[0].startsWith('#')||m[0].startsWith('//')?'comment':'keyword';html+=`<span class="token-${type}">${escape(m[0])}</span>`;last=m.index+m[0].length;}code.innerHTML=html+escape(raw.slice(last));}
  document.querySelectorAll('.prose pre').forEach(pre=>{const code=pre.querySelector('code');if(!code)return;const raw=code.textContent;const language=[...code.classList].find(x=>x.startsWith('language-'))?.slice(9)||'text';const wrapper=document.createElement('div');wrapper.className='code-wrap';pre.before(wrapper);const label=document.createElement('span');label.className='code-label';label.textContent=language;const copy=document.createElement('button');copy.type='button';copy.className='copy-code';copy.textContent='Copy';copy.setAttribute('aria-label',`Copy ${language} code`);copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(code.textContent);copy.textContent='Copied';}catch{copy.textContent='Select text to copy';}});wrapper.append(label,copy,pre);if(language==='kujo')highlight(code);});
  const article=document.querySelector('.lesson-main .prose');
  if(article){const headings=[...article.querySelectorAll('h2')];const nav=document.createElement('nav');nav.className='toc';nav.setAttribute('aria-label','On this page');const list=document.createElement('ul');headings.forEach((h,i)=>{h.id ||= `section-${i+1}`;const li=document.createElement('li'),a=document.createElement('a');a.href='#'+h.id;a.textContent=h.textContent;li.append(a);list.append(li);});nav.append(list);article.prepend(nav);}
  const select=document.querySelector('#example-select');
  if(select){fetch('/assets/course-examples.json').then(r=>{if(!r.ok)throw Error('examples');return r.json();}).then(rows=>{select.replaceChildren();for(const row of rows){const option=document.createElement('option');option.value=row.id;option.textContent=`${row.id} / ${row.title}`;select.append(option);}const render=()=>{const row=rows.find(x=>x.id===select.value)||rows[0];document.querySelector('#explorer-source').textContent=row.source;highlight(document.querySelector('#explorer-source'));document.querySelector('#explorer-output').textContent=row.output;document.querySelector('#explorer-diagnostic').textContent=row.diagnostic;const link=document.createElement('a');link.href=row.url;link.textContent='Read this lesson →';document.querySelector('#example-link').replaceChildren(link);document.querySelector('#explorer-status').textContent='Captured from Kujo 1.3.1. No code was executed here.';};select.addEventListener('change',render);render();}).catch(()=>{document.querySelector('#explorer-status').textContent='Examples could not load. Every lesson includes the same source and captured output.';});}
})();
