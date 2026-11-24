document.getElementById("atelier-slot").outerHTML=`<section id="atelier" class="atelier"><div class="wrap"><div class="sechead"><h2>L'atelier réparation</h2><p>Prix indicatifs pièce et main-d'œuvre comprises. Devis confirmé après diagnostic.</p></div><div class="repgrid"><div><table class="tarifs"><caption>Téléphone</caption><tr><td>Remplacement écran<small>iPhone, Samsung, Xiaomi, Oppo…</small></td><td>dès 59 €</td></tr><tr><td>Remplacement batterie<small>Capacité d'origine</small></td><td>dès 39 €</td></tr><tr><td>Connecteur de charge</td><td>dès 45 €</td></tr><tr><td>Vitre arrière</td><td>dès 49 €</td></tr><tr><td>Caméra / haut-parleur / micro</td><td>dès 35 €</td></tr></table><table class="tarifs"><caption>Trottinette électrique</caption><tr><td>Réparation crevaison / chambre à air<small>8,5" et 10"</small></td><td>dès 25 €</td></tr><tr><td>Pneu plein anti-crevaison</td><td>dès 49 €</td></tr><tr><td>Réglage / remplacement freins</td><td>dès 29 €</td></tr><tr><td>Remplacement batterie<small>36 V / 48 V selon modèle</small></td><td>dès 189 €</td></tr><tr><td>Contrôleur, écran ou accélérateur</td><td>dès 59 €</td></tr></table></div><form class="quote" id="quoteForm" novalidate><h3>Demande de devis</h3><div class="two"><div class="field"><label for="q-type">Appareil</label><select id="q-type"><option value="tel">Téléphone</option><option value="trot">Trottinette</option></select></div><div class="field"><label for="q-panne">Panne</label><select id="q-panne"></select></div></div><div class="field"><label for="q-modele">Marque et modèle</label><input id="q-modele" placeholder="ex. iPhone 13, Xiaomi Pro 2" required></div><div class="estimate" aria-live="polite"><span>Estimation</span><b id="est">dès 59 €</b></div><div class="two"><div class="field"><label for="q-nom">Nom</label><input id="q-nom" autocomplete="name" required></div><div class="field"><label for="q-tel">Téléphone</label><input id="q-tel" type="tel" autocomplete="tel" required></div></div><div class="field"><label for="q-msg">Détails (facultatif)</label><textarea id="q-msg" rows="3" placeholder="Depuis quand ? Chute, eau, autre…"></textarea></div><div class="field"><label for="q-mode">Comment nous confier l'appareil ?</label><select id="q-mode"><option>Dépôt à Montpellier</option><option>Envoi par La Poste</option><option>Envoi par Mondial Relay</option></select></div><button class="btn primary" type="submit" style="width:100%">Envoyer ma demande sur WhatsApp</button><p class="ok" id="qok" hidden></p></form></div><div class="steps"><div>Vous décrivez la panne, puis vous déposez l'appareil ou nous l'envoyez (La Poste, Mondial Relay).</div><div>Diagnostic gratuit et devis ferme.</div><div>Réparation avec pièces garanties 6 mois.</div><div>Vous récupérez votre appareil testé, ou nous vous le renvoyons.</div></div></div></section>`;
const tr=document.querySelector(".track");tr.innerHTML+=[...tr.children].map(x=>x.outerHTML.replace("<span","<span aria-hidden=\"true\"")).join("");
const WHATSAPP="33612545325";
const $=s=>document.querySelector(s);
const wa=t=>"https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent(t);
document.querySelectorAll(".pack").forEach(pack=>{
const opts=pack.querySelectorAll(".opt"), input=pack.querySelector("input"), btn=pack.querySelector(".order"), err=pack.querySelector(".err");
let choice="";
opts.forEach(o=>o.addEventListener("click",()=>{choice=o.dataset.opt;opts.forEach(x=>x.setAttribute("aria-pressed",x===o));err.hidden=true;}));
btn.addEventListener("click",e=>{
const m=input.value.trim();
if(!choice||!m){e.preventDefault();err.hidden=false;err.textContent=!choice?"Choisissez verre trempé ou film gel.":"Indiquez le modèle de votre téléphone.";return}
err.hidden=true;
btn.href=wa(`Bonjour BSPHONEWORLD, je souhaite la ${pack.dataset.pack} (${pack.dataset.price} €).\nProtection d'écran : ${choice}\nModèle : ${m}`);
});
});
const PANNES={
tel:[["Écran cassé",59],["Batterie",39],["Connecteur de charge",45],["Vitre arrière",49],["Caméra / son",35],["Autre / je ne sais pas",0]],
trot:[["Crevaison",25],["Pneu plein",49],["Freins",29],["Batterie",189],["Électronique (contrôleur, écran)",59],["Autre / je ne sais pas",0]]
};
function fillPannes(){
$("#q-panne").innerHTML=PANNES[$("#q-type").value].map(([n],i)=>`<option value="${i}">${n}</option>`).join("");
updEst();
}
function updEst(){
const [,v]=PANNES[$("#q-type").value][$("#q-panne").value];
$("#est").textContent=v?`dès ${v} €`:"Diagnostic gratuit";
}
$("#q-type").addEventListener("change",fillPannes);
$("#q-panne").addEventListener("change",updEst);
$("#quoteForm").addEventListener("submit",e=>{
e.preventDefault();
const ok=$("#qok"); ok.hidden=false;
if(["q-modele","q-nom","q-tel"].some(id=>!$("#"+id).value.trim())){ok.style.color="#c2410c";ok.textContent="Merci de remplir le modèle, votre nom et votre téléphone.";return}
const [pn]=PANNES[$("#q-type").value][$("#q-panne").value];
const txt=["Bonjour BSPHONEWORLD, je souhaite un devis de réparation :",
`Appareil : ${$("#q-type").value==="tel"?"Téléphone":"Trottinette"} – ${$("#q-modele").value.trim()}`,
`Panne : ${pn} (${$("#est").textContent})`,
`Mode : ${$("#q-mode").value}`,
$("#q-msg").value.trim()?`Détails : ${$("#q-msg").value.trim()}`:null,"",
`Nom : ${$("#q-nom").value.trim()}`,`Téléphone : ${$("#q-tel").value.trim()}`].filter(l=>l!==null).join("\n");
const url=wa(txt);
window.open(url,"_blank");
ok.style.color="";
ok.innerHTML=`WhatsApp s'ouvre avec votre demande. Rien ne s'est ouvert ? <a href="${url}" target="_blank" rel="noopener">Cliquez ici</a>.`;
});
fillPannes();
