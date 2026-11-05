const clockEls = [document.getElementById("top-clock"), document.getElementById("task-clock")];
function updateClock(){
  const now = new Date();
  const value = now.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});
  clockEls.forEach(el => { if(el) el.textContent = value; });
}
updateClock(); setInterval(updateClock, 15000);

const windows = [...document.querySelectorAll(".retro-window")];
function openWindow(id){
  windows.forEach(win => win.hidden = win.id !== id);
}
function closeWindow(win){ win.hidden = true; }

document.querySelectorAll("[data-open]").forEach(button => {
  button.addEventListener("click", () => openWindow(button.dataset.open));
});
document.querySelectorAll(".window-close, .fake-close").forEach(button => {
  button.addEventListener("click", () => closeWindow(button.closest(".retro-window") || document.querySelector(".popup")));
});

// Permite arrastar as janelas pelo cabeçalho em telas com mouse ou toque.
document.querySelectorAll(".window-title").forEach(bar => {
  let startX=0, startY=0, originX=0, originY=0, dragging=false;
  const win = bar.closest(".retro-window");
  bar.addEventListener("pointerdown", event => {
    if(event.target.closest("button")) return;
    dragging=true; bar.setPointerCapture(event.pointerId);
    const rect=win.getBoundingClientRect();
    startX=event.clientX; startY=event.clientY;
    originX=rect.left + rect.width/2; originY=rect.top + rect.height/2;
    win.style.transform="none"; win.style.left=rect.left+"px"; win.style.top=rect.top+"px";
  });
  bar.addEventListener("pointermove", event => {
    if(!dragging) return;
    win.style.left=(originX + event.clientX-startX - win.offsetWidth/2)+"px";
    win.style.top=Math.max(8,originY + event.clientY-startY - win.offsetHeight/2)+"px";
  });
  bar.addEventListener("pointerup", () => dragging=false);
  bar.addEventListener("pointercancel", () => dragging=false);
});
