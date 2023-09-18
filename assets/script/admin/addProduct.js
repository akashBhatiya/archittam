const formFields = document.querySelectorAll('input, textarea');
    
formFields.forEach((field, index) => {
    field.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const nextField = formFields[index + 1];
            if (nextField) {
                nextField.focus();
            }
        }
    });
});



const i1002 = document.getElementById('i1002');
function addinput(){
    i1002.innerHTML += `<div class="input-container"><input type="text" name="images[]"><ion-icon name="close-outline" class="icon"></ion-icon></div>`;
    
    const closeButton1002 = document.querySelectorAll('#i1002 .icon');
    const inputContainer1002 = document.querySelectorAll('#i1002 .input-container');

    closeButton1002.forEach(x => {
        x.addEventListener('click', () =>{
            x.parentNode.remove();
        })
    })
}

addinput();


const addField = document.getElementById("inner1004-2-btn1");
const inner10041 = document.getElementById("inner1004-1");
let count = 0;

addField.addEventListener('click', ()=> {
    count++;

    const optionName = `v${count}`;
    
    const optionContainer = document.createElement('div');
    optionContainer.classList.add('input-container');

    const optionLabel = document.createElement('label');
    optionLabel.setAttribute('for', optionName);
    optionLabel.textContent = 'Option name';

    const optionInput = document.createElement('input');
    optionInput.setAttribute('type', 'text');
    optionInput.setAttribute('name', optionName);
    optionInput.setAttribute('placeholder', 'Color');

    const deleteIcon = document.createElement('ion-icon');
    deleteIcon.classList.add('icon', 'close-icon');
    deleteIcon.setAttribute('name', 'trash-outline');
    deleteIcon.addEventListener('click', () => {
        optionContainer.remove();
    });

    const inputFieldContainer = document.createElement('div');
    inputFieldContainer.classList.add('input-field-container');
  
    const valuesInput = document.createElement('input');
    valuesInput.setAttribute('type', 'text');
    valuesInput.setAttribute('name', `${optionName}[]`);
    valuesInput.setAttribute('placeholder', 'comma separated values (No space)');
    
    inputFieldContainer.appendChild(valuesInput);
    
    optionContainer.appendChild(optionLabel);
    const lineBreak = document.createElement('br');
    optionContainer.appendChild(lineBreak);
    optionContainer.appendChild(optionInput);
    optionContainer.appendChild(deleteIcon);
    optionContainer.appendChild(inputFieldContainer);
    
    inner10041.appendChild(optionContainer);
})

const tableGen = document.getElementById('inner1004-2-btn2');
const variantsTableContainer = document.getElementById('variantsTableContainer');

tableGen.addEventListener('click',()=>{
    
    const variantOptions = Array.from(document.querySelectorAll('.input-field-container input')).map(input => input.value.split(','));

    const validOptions = variantOptions.filter(options => options[0].trim() !== '');

    const headers = validOptions.map((options, index) => {
        let optionNameInput = document.querySelector(`[name="v${index + 1}"]`);
        if(!optionNameInput){
            let i = 1;
            while(!optionNameInput){
                i++;
                optionNameInput = document.querySelector(`[name="v${index + i}"]`);
            }
        }
        return optionNameInput ? optionNameInput.value : '';
    });
    headers.push('SKU', 'Extra (₹)', 'Quantity','Actions');

    const table = document.createElement('table');
    const tableBody = document.createElement('tbody');

    // Generate header row
    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        const headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });
    tableBody.appendChild(headerRow);

    for (const optionValues of generateCombinations(validOptions)) {
        const row = document.createElement('tr');
        const productID = document.getElementById('productId'); 
        let sku = productID.value;
        optionValues.forEach(option => {
          const cell = document.createElement('td');
          cell.textContent = option;
          sku += `-${cell.textContent}`;
          row.appendChild(cell);
        });

        const skuCell = document.createElement('td');
        const skuInput = document.createElement('input');
        skuInput.classList.add('fixed-width1');
        skuInput.setAttribute('type', 'text');
        skuInput.setAttribute('value',sku);
        skuCell.appendChild(skuInput);
        row.appendChild(skuCell);
    
        const priceCell = document.createElement('td');
        const priceInput = document.createElement('input');
        priceInput.classList.add('fixed-width2');
        priceInput.setAttribute('type', 'number');
        priceInput.setAttribute('value',0);
        priceCell.appendChild(priceInput);
        row.appendChild(priceCell);
    
        const quantityCell = document.createElement('td');
        const quantityInput = document.createElement('input');
        quantityInput.classList.add('fixed-width2');
        quantityInput.setAttribute('type', 'number');
        quantityInput.setAttribute('value',100);
        quantityCell.appendChild(quantityInput);
        row.appendChild(quantityCell);
    
        const deleteCell = document.createElement('td');
        const deleteIcon = document.createElement('ion-icon');
        deleteIcon.classList.add('icon', 'close-icon');
        deleteIcon.setAttribute('name', 'trash-outline');
        deleteIcon.addEventListener('click', () => {
          row.remove();
        });
        deleteCell.appendChild(deleteIcon);
        row.appendChild(deleteCell);
    
        tableBody.appendChild(row);
    }

    table.appendChild(tableBody);
    variantsTableContainer.innerHTML = ""
    variantsTableContainer.appendChild(table);


    const tableRows = tableBody.querySelectorAll('tr');    
    
    // Apply sticky styles to cells in the specified columns for each row
    tableRows.forEach(row => {
        let distance = 0;
        for (let i = 0; i < validOptions.length; i++) {
          
            const cellElement = row.querySelector(`td:nth-child(${i+1}),th:nth-child(${i+1})`);
            if (cellElement) {
                cellElement.style.position = 'sticky';
                cellElement.style.left = `${distance}px`;
                cellElement.style.backgroundColor = 'white';
            }
            distance += cellElement.clientWidth ;
        }
        
    });

})

function generateCombinations(arrays) {
    const results = [];
  
    function helper(current, index) {
      if (index === arrays.length) {
        results.push(current.slice());
        return;
      }
  
      for (const value of arrays[index]) {
        current[index] = value;
        helper(current, index + 1);
      }
    }
  
    helper([], 0);
    return results;
}


const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const formData = new FormData(form);
    const imageUrls = formData.getAll('images[]');

    // Convert imageUrls array to a plain array of strings
    const imagesArray = Array.from(imageUrls);

    // Remove the "images[]" key from the formData
    if (formData.has('images[]')) {
        formData.delete('images[]');
    }

    // Set the new "images" key with the imagesArray
    formData.append('images',JSON.stringify(imagesArray));

    const tableRows = document.querySelectorAll('#variantsTableContainer table tbody tr:not(:first-child)');

    const variantsTypes = [];

    for(let i = 1; i<=20;i++ ){
        const name = `v${i}`;
        const array = `v${i}[]`;
        const variantTypesObject = {};
        if(formData.get(name) && formData.get(array)){
            variantTypesObject[name] = formData.get(name);
            variantTypesObject[array] = formData.get(array);
            variantsTypes.push(variantTypesObject);
        }
    }

    for(let i = 1; i<=20;i++ ){
        const name = `v${i}`;
        const array = `v${i}[]`;
        if (formData.has(name)) {
            formData.delete(name);
        }
        if (formData.has(array)) {
            formData.delete(array);
        }
    }
    

    formData.append('variantsTypes', JSON.stringify(variantsTypes));

    const variantsArray = [];

    tableRows.forEach(row => {
        const variantObject = {};
        const cells = row.querySelectorAll('td:not(:last-child)');

        cells.forEach((cell, index) => {
            let headerText = document.querySelector('th:nth-child(' + (index + 1) + ')').textContent;
            if(headerText === 'Extra (₹)'){
                headerText = "extra"
            }
            
            let cellValue = '';

            // Check if the cell contains an input element
            const inputElement = cell.querySelector('input');
            if (inputElement) {
                cellValue = inputElement.value;
            } else {
                cellValue = cell.textContent;
            }

            variantObject[headerText] = cellValue;
        });

        variantsArray.push(variantObject);
    });

    formData.append('variants', JSON.stringify(variantsArray));
    // console.log(formData);

    const formDataObject = {};

    for (const [key, value] of formData.entries()) {
        formDataObject[key] = value;
    }

    fetch('/admin/createProduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataObject)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Server response:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
}); 





