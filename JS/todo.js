const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('click',handleCheckBoxes);
})

let previousCheckBox = null;
let keepChecking = false;

function handleCheckBoxes(e){
    if(this === previousCheckBox){
        previousCheckBox = '';        
        if(this.checked && !Strike.checkForStrike(this.nextElementSibling.innerHTML)){
            const todoText = Strike.addStrike(this.nextElementSibling.innerHTML);
            this.nextElementSibling.innerHTML = todoText;
        }
        else if(!this.checked && Strike.checkForStrike(this.nextElementSibling.innerHTML)){
            const todoText = Strike.removeStrike(this.nextElementSibling.innerHTML);
            this.nextElementSibling.innerHTML = todoText;
        }
    }
    else if(previousCheckBox && this.checked && e.shiftKey){
        inputs.forEach(input => {
            if(input === this || input === previousCheckBox){
                keepChecking = !keepChecking;
            }

            if(keepChecking){
                input.checked = true;
            }

        })

        inputs.forEach(input => {
            if(input.checked){
                if(!Strike.checkForStrike(input.nextElementSibling.innerHTML)){
                    input.nextElementSibling.innerHTML = Strike.addStrike(input.nextElementSibling.innerHTML)
                }
            }
            else{
                if(Strike.checkForStrike(input.nextElementSibling.innerHTML)){
                    input.nextElementSibling.innerHTML = Strike.removeStrike(input.nextElementSibling.innerHTML)
                }
            }
        })
    }
    else{
        previousCheckBox = this;
        if(this.checked && !Strike.checkForStrike(this.nextElementSibling.innerHTML)){
            const todoText = Strike.addStrike(this.nextElementSibling.innerHTML);
            this.nextElementSibling.innerHTML = todoText;
        }
        else if(!this.checked && Strike.checkForStrike(this.nextElementSibling.innerHTML)){
            const todoText = Strike.removeStrike(this.nextElementSibling.innerHTML);
            this.nextElementSibling.innerHTML = todoText;
        }
    }
}


class Strike{
    static addStrike(text){
        text = `<strike>${text}</strike>`;
        return text;
    }

    static removeStrike(text){
        let newText = '';
        for (let i = 8; i < text.length-9; i++) {
            newText+= text[i];
        }
        return newText;
    }

    static checkForStrike(text){
        if(text[0]==='<' && text[text.length-1] ==='>'){
            return true;
        }
        return false;
    }
}