var countEl = document.getElementById("count-el");    
let count = 0
let saved = false
function increment(){
   count = parseInt(countEl.textContent)
    countEl.textContent = ++count;
}

function resetCount(){
    count = 0
    countEl.textContent = count;
}

function save(){
    let doc = document.getElementById("save-el");
    if(count != 0){
        if(saved){
            doc.textContent += ` - ${count}`
        }else{
            saved = true
            doc.textContent += `${count}`
        }
    }
    resetCount()
}