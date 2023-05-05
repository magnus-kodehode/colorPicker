document.getElementById('colorSchemeBtn').addEventListener('click', () => {
    const theme = document.querySelector('select').value
    const seedColor = document.getElementById('seedColor').value.replace('#', '') //replace the # with an empty string
    fetchColors(seedColor, theme)
})

function fetchColors(seedColor, theme) {
    let colorHex = []; // define colorHex as an empty array
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&format=JSON&mode=${theme}&count=5`)
        .then(res => res.json())
        .then(data => {
            colorHex = data.colors.map(color => color.hex.value.replace('#', '')) // push hex values into colorHex
            displayColors(colorHex)
        })
        .catch(error => {
            console.error('Error fetching color scheme:', error)
        })
}

function displayColors(colorHex) {
    const colorContainer = document.getElementById('colorOptionsContainer')
    colorContainer.innerHTML = '' // Clear any existing color elements

    //Create separate divs for each color
    colorHex.forEach(color => {
        const colorElement = document.createElement('div')

        colorElement.classList.add('colorElement')
        colorElement.style.backgroundColor = `#${color}`
        colorElement.style.width = '20%'
        colorElement.style.height = '90%'
        colorElement.style.margin = '0'
        colorElement.style.cursor = 'pointer'

        //adding event listeners to each color div, and make the user able to click a div to copy color
        colorElement.addEventListener('click', () => {
            //added .then to resolve the promise returned from navigator before displaying alert message
            navigator.clipboard.writeText(`#${color}`).then(() => { 
                alert(`#${color} copied to clipboard`)
            })  
        })
        //Create paragraph inside the color box with hex code
        const colorText = document.createElement('p')
        
        colorText.innerText = `#${color}`
        colorText.style.color = 'white'
        colorText.style.fontWeight = 'bold'

        //append generated elements
        colorContainer.appendChild(colorElement)
        colorElement.appendChild(colorText)
    })
}